import { KeyboardEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Input,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { FaUser, FaWikipediaW } from "react-icons/fa";
import { SearchResult } from "@/app/api/searching/route";
import { navigateToPlayer } from "@/app/client-redirect";
import { useI18n } from "@/components/i18n/i18n-provider";

export const SearchBar = () => {
  const { t } = useI18n();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const executeSearch = (searchResult: SearchResult) => {
    if (typeof window === "undefined") {
      return;
    }

    if (searchResult.type === "wiki") {
      const url = `https://zh.minecraft.wiki/w/${encodeURIComponent(searchResult.text)}`;
      window.open(url, "_blank");
      return;
    }

    navigateToPlayer(searchResult.text);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const query = event.currentTarget.value.trim();

    if (!query) {
      return;
    }

    executeSearch({
      text: query,
      type: "wiki",
      icon: "",
    });
  };

  useEffect(() => {
    const query = keyword.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const timer = window.setTimeout(() => {
      axios
        .get(`/api/searching?keyword=${encodeURIComponent(query)}`)
        .then((response) => response.data.data as SearchResult[])
        .then((data) => {
          setSearchResults(
            data.map((item) => ({
              text: item.text,
              type: item.type,
              icon: item.icon,
            })),
          );
        })
        .catch(() => {
          setSearchResults([]);
        });
    }, 180);

    return () => {
      window.clearTimeout(timer);
    };
  }, [keyword]);

  return (
    <div className="relative w-full">
      <Input
        autoComplete="off"
        isClearable
        fullWidth
        value={keyword}
        type="search"
        onChange={(event) => setKeyword(event.target.value)}
        onClear={() => setKeyword("")}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={t("common.searchPlaceholder")}
      />
      {isOpen && keyword.length > 0 && (
        <div className="absolute left-0 right-0 mt-2">
          <Card>
            <CardBody className="max-h-60 overflow-y-auto px-0">
              <Listbox>
                {searchResults
                  .filter((searchItem) =>
                    searchItem.text.toLowerCase().includes(keyword.toLowerCase()),
                  )
                  .map((searchItem, index) => (
                    <ListboxItem
                      key={index}
                      onClick={(event) => {
                        if (event.button !== 0) {
                          return;
                        }

                        executeSearch(searchItem);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() => setKeyword(searchItem.text)}
                        >
                          <GoArrowUpRight />
                        </Button>
                        {typeof searchItem.icon === "string" ? (
                          <Badge
                            content={
                              searchItem.type === "wiki" ? <FaWikipediaW /> : <FaUser />
                            }
                          >
                            <Avatar
                              radius="sm"
                              src={searchItem.icon}
                              alt={searchItem.text}
                            />
                          </Badge>
                        ) : (
                          searchItem.icon
                        )}
                        <span>{searchItem.text}</span>
                      </div>
                    </ListboxItem>
                  ))}
              </Listbox>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
