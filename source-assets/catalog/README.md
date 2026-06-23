# Catalog Source Assets

Put future catalog source files into these folders:

- `source-assets/catalog/fish/images`
  Fish artwork source files.
- `source-assets/catalog/fish/workbooks`
  Fish metadata Excel files. The generator will automatically use the newest `.xlsx` in this folder.
- `source-assets/catalog/omamori/images`
  Omamori artwork source files.
- `source-assets/catalog/activity/images`
  Reserved for future activity catalog images.

To regenerate the public catalog assets and JSON data after you update files:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-catalog-data.ps1
```

The generated output will refresh:

- `public/catalog/fish`
- `public/catalog/omamori`
- `data/catalog/fish-catalog.json`
- `data/catalog/omamori-catalog.json`
