package CosplayCostumes.rest.model.dto.subcategory;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubcategoryDTO implements Serializable {
    private String code;
    private Long categoryID;
    private String description;
}
