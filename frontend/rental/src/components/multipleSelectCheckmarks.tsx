import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/root.store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectCheckmarks = () => {
  const { productStore, categoryStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    categoryStore.fetchCategories();
  }, [categoryStore]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            {t("chooseCategory")}
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={productStore.categoryFilter}
            onChange={productStore.handleCategoryFilterChange}
            input={<OutlinedInput label="Choose movies" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            color={"secondary"}
          >
            {categoryStore.visibleCategories.map((category) => (
              <MenuItem key={category.id} value={category.code}>
                <Checkbox
                  checked={
                    productStore.categoryFilter.indexOf(category.code) > -1
                  }
                />
                <ListItemText primary={category.code} />
              </MenuItem>
            ))}
          </Select>
      </FormControl>
    </div>
  );
};

export default observer(MultipleSelectCheckmarks);
