$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectRoot = Split-Path -Parent $PSScriptRoot
$assetRoot = Join-Path $projectRoot "source-assets\catalog"
$fishSourceDir = Join-Path $assetRoot "fish\images"
$omamoriSourceDir = Join-Path $assetRoot "omamori\images"
$fishWorkbookDir = Join-Path $assetRoot "fish\workbooks"

$fishTargetDir = Join-Path $projectRoot "public\catalog\fish"
$omamoriTargetDir = Join-Path $projectRoot "public\catalog\omamori"
$dataTargetDir = Join-Path $projectRoot "data\catalog"

New-Item -ItemType Directory -Force -Path $fishSourceDir | Out-Null
New-Item -ItemType Directory -Force -Path $omamoriSourceDir | Out-Null
New-Item -ItemType Directory -Force -Path $fishWorkbookDir | Out-Null
New-Item -ItemType Directory -Force -Path $fishTargetDir | Out-Null
New-Item -ItemType Directory -Force -Path $omamoriTargetDir | Out-Null
New-Item -ItemType Directory -Force -Path $dataTargetDir | Out-Null

function Get-LatestWorkbookPath {
  param([string]$WorkbookDirectory)

  $latestWorkbook = Get-ChildItem -LiteralPath $WorkbookDirectory -File -Filter "*.xlsx" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

  if (-not $latestWorkbook) {
    throw "No fish workbook found in $WorkbookDirectory"
  }

  return $latestWorkbook.FullName
}

Get-ChildItem -LiteralPath $fishSourceDir -File | Copy-Item -Destination $fishTargetDir -Force

function Get-ZipText {
  param(
    [System.IO.Compression.ZipArchive]$Zip,
    [string]$EntryName
  )

  $entry = $Zip.Entries | Where-Object { $_.FullName -eq $EntryName }
  if (-not $entry) {
    throw "Zip entry not found: $EntryName"
  }

  $reader = New-Object System.IO.StreamReader($entry.Open())
  try {
    return $reader.ReadToEnd()
  } finally {
    $reader.Close()
  }
}

function Get-ExcelCellText {
  param(
    [System.Xml.XmlElement]$Cell,
    [string[]]$SharedStrings
  )

  if (-not $Cell) {
    return ""
  }

  $trimText = {
    param($Value)

    if ($null -eq $Value) {
      return ""
    }

    return ([string]$Value).Trim()
  }

  if ($Cell.t -eq "s") {
    $sharedIndex = [string]$Cell.v
    if ($sharedIndex -ne "") {
      return & $trimText $SharedStrings[[int]$sharedIndex]
    }

    return ""
  }

  if ($Cell.t -eq "inlineStr") {
    if ($Cell.is.t) {
      return & $trimText $Cell.is.t
    }

    if ($Cell.is.r) {
      return & $trimText (($Cell.is.r | ForEach-Object { $_.t }) -join "")
    }

    return ""
  }

  if ($Cell.v -is [System.Xml.XmlElement]) {
    return & $trimText $Cell.v.InnerText
  }

  return & $trimText $Cell.v
}

function Convert-ExcelSheetToRows {
  param([string]$WorkbookPath)

  $tempWorkbookPath = Join-Path ([System.IO.Path]::GetTempPath()) ("uparupa-fish-catalog-" + [System.Guid]::NewGuid().ToString() + ".xlsx")
  Copy-Item -LiteralPath $WorkbookPath -Destination $tempWorkbookPath -Force

  $zip = [System.IO.Compression.ZipFile]::OpenRead($tempWorkbookPath)
  try {
    $sharedStringsXml = [xml](Get-ZipText -Zip $zip -EntryName "xl/sharedStrings.xml")
    $sheetXml = [xml](Get-ZipText -Zip $zip -EntryName "xl/worksheets/sheet1.xml")

    $sharedStrings = @()
    foreach ($sharedItem in $sharedStringsXml.sst.si) {
      if ($sharedItem.t) {
        if ($sharedItem.t -is [System.Xml.XmlElement]) {
          $sharedStrings += [string]$sharedItem.t.InnerText
        } else {
          $sharedStrings += [string]$sharedItem.t
        }
      } elseif ($sharedItem.r) {
        $sharedStrings += (($sharedItem.r | ForEach-Object { $_.t }) -join "")
      } else {
        $sharedStrings += ""
      }
    }

    $namespaceManager = New-Object System.Xml.XmlNamespaceManager($sheetXml.NameTable)
    $namespaceManager.AddNamespace("x", "http://schemas.openxmlformats.org/spreadsheetml/2006/main")
    $rows = $sheetXml.SelectNodes("//x:sheetData/x:row", $namespaceManager)
    $results = @()

    foreach ($row in $rows | Select-Object -Skip 1) {
      $cells = @{}
      foreach ($cell in $row.c) {
        $column = ($cell.r -replace "\d", "")
        $cells[$column] = Get-ExcelCellText -Cell $cell -SharedStrings $sharedStrings
      }

      if ([string]::IsNullOrWhiteSpace($cells["E"])) {
        continue
      }

      $results += [PSCustomObject]@{
        commonName         = $cells["A"]
        chineseScientific  = $cells["B"]
        latinName          = $cells["C"]
        jsonName           = $cells["D"]
        modelId            = $cells["E"]
        sizeCm             = $cells["F"]
        sizePrice          = $cells["G"]
        unitPrice          = $cells["H"]
        averageValue       = $cells["I"]
        rarity             = $cells["K"]
        habitNight         = $cells["L"]
        habitRain          = $cells["M"]
        effect             = $cells["N"]
        summary            = $cells["O"]
        materialType       = $cells["P"]
        vanillaIcon        = $cells["Q"]
        realDistribution   = $cells["R"]
        terrainCategory    = $cells["S"]
        terrainCode        = $cells["T"]
        serverDistribution = $cells["U"]
        mcBiome            = $cells["V"]
        biomeEnabled       = $cells["W"]
        biomeReplacement   = $cells["X"]
        biomeColor         = $cells["Y"]
      }
    }

    return $results
  } finally {
    $zip.Dispose()
    if (Test-Path -LiteralPath $tempWorkbookPath) {
      Remove-Item -LiteralPath $tempWorkbookPath -Force
    }
  }
}

$fishWorkbookPath = Get-LatestWorkbookPath -WorkbookDirectory $fishWorkbookDir
$fishRows = Convert-ExcelSheetToRows -WorkbookPath $fishWorkbookPath
$fishRowsById = @{}
foreach ($row in $fishRows) {
  $fishRowsById[[string]$row.modelId] = $row
}

$fishItems = Get-ChildItem -LiteralPath $fishSourceDir -File | Sort-Object Name | ForEach-Object {
  if ($_.BaseName -notmatch "^YUYU_(\d+)_") {
    return
  }

  $id = $Matches[1]
  $row = $fishRowsById[$id]
  $fallbackName = ($_.BaseName -replace "^YUYU_\d+_", "") -replace "_PVw$", "" -replace "_kai$", "" -replace "_", " "

  if ($row) {
    [PSCustomObject]@{
      id                 = $id
      name               = $row.commonName
      scientificName     = $row.latinName
      jsonName           = $row.jsonName
      sizeCm             = $row.sizeCm
      unitPrice          = $row.unitPrice
      rarity             = $row.rarity
      effect             = $row.effect
      summary            = $row.summary
      realDistribution   = $row.realDistribution
      terrainCategory    = $row.terrainCategory
      serverDistribution = $row.serverDistribution
      mcBiome            = $row.mcBiome
      hasMetadata        = $true
      image              = "/catalog/fish/$($_.Name)"
      sourceFile         = $_.Name
    }
  } else {
    [PSCustomObject]@{
      id                 = $id
      name               = $fallbackName
      scientificName     = ""
      jsonName           = $fallbackName
      sizeCm             = ""
      unitPrice          = ""
      rarity             = ""
      effect             = ""
      summary            = ""
      realDistribution   = ""
      terrainCategory    = ""
      serverDistribution = ""
      mcBiome            = ""
      hasMetadata        = $false
      image              = "/catalog/fish/$($_.Name)"
      sourceFile         = $_.Name
    }
  }
} | Where-Object { $_ }

$omamoriItems = Get-ChildItem -LiteralPath $omamoriSourceDir -File | Sort-Object Name | ForEach-Object {
  if ($_.BaseName -match "^YUSHOU_(\d+)_([^_]+)_(.+)_PVw$") {
    $id = $Matches[1]
    $code = $Matches[2]
    $name = $Matches[3]
  } else {
    $id = $_.BaseName
    $code = ""
    $name = $_.BaseName
  }

  $summary = ""
  $safeCode = if ([string]::IsNullOrWhiteSpace($code)) { "item" } else { $code }
  $publicFileName = "omamori_{0}_{1}.png" -f $id, $safeCode

  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $omamoriTargetDir $publicFileName) -Force

  [PSCustomObject]@{
    id         = $id
    code       = $code
    name       = $name
    summary    = $summary
    image      = "/catalog/omamori/$publicFileName"
    sourceFile = $_.Name
  }
}

$fishItems | ConvertTo-Json -Depth 4 | Set-Content -Path (Join-Path $dataTargetDir "fish-catalog.json") -Encoding UTF8
$omamoriItems | ConvertTo-Json -Depth 4 | Set-Content -Path (Join-Path $dataTargetDir "omamori-catalog.json") -Encoding UTF8

Write-Output ("Using fish workbook: " + $fishWorkbookPath)
Write-Output ("Generated fish catalog items: " + $fishItems.Count)
Write-Output ("Generated omamori catalog items: " + $omamoriItems.Count)
