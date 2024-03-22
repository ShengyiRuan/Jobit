import { v4 as uuidv4 } from "uuid";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FilterCheckbox from "./FilterCheckBox";
import { filters } from "@/constants";

const FilterSidebar = async () => (
  <aside className="hidden w-[251px] xl:block">
    {filters?.data &&
      Object.entries(filters.data).map(
        ([key, value]: [string, CommonFilterDataShapeType[]]) => {
          return (
            key !== "categories" && (
              <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="semibold-18 pt-0 capitalize text-Black hover:text-Primary dark:text-white hover:dark:text-Primary">
                    {key.replace("_", " ")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3.5">
                      {value.map((filter) => {
                        return (
                          <div
                            className="flex items-center justify-between"
                            key={uuidv4()}
                          >
                            <FilterCheckbox
                              filterKey={key}
                              filterName={filter.name}
                              filterValue={filter.value}
                            ></FilterCheckbox>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          );
        },
      )}
  </aside>
);

export default FilterSidebar;
