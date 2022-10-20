
package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Subcategory;
import CosplayCostumes.app.model.dto.SubcategoryDTO;
import CosplayCostumes.app.repostitory.SubCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class SubCategoryService {
    private final static String SUB_CATEGORY_NO_FOUND = "Failed to find sub category with name ";
    private final static String SUB_CATEGORY_ID_NO_FOUND = "Failed to find sub category with id ";
    private final static String SUB_CATEGORY_EXIST = "Sub Category with this name is already exist ! ";
    private final SubCategoryRepository subCategoryRepository;
    private final CategoryService categoryService;

    public List<Subcategory> findAllSubCategory() {
        return subCategoryRepository.findAll();
    }

    public Subcategory findSubCategoryByCode(String code) throws Exception {
        return subCategoryRepository.findByCode(code).orElseThrow(() -> new FindException(SUB_CATEGORY_NO_FOUND + code));
    }

    public Subcategory addSubCategory(SubcategoryDTO subcategory) {
        if (subCategoryRepository.findByCode(subcategory.getCode()).isPresent()) {
            throw new FindException(SUB_CATEGORY_EXIST + subcategory.getCode());
        }

        Subcategory newSubCategory = new Subcategory();
        newSubCategory.setCategory(categoryService.findCategoryById(subcategory.getCategoryID()));
        newSubCategory.setCode(subcategory.getCode());
        newSubCategory.setVisible(true);

        return subCategoryRepository.save(newSubCategory);
    }

    public Subcategory updateSubCategory(Subcategory subcategory) {
        subCategoryRepository.findById(subcategory.getId()).orElseThrow(() ->
                new FindException(SUB_CATEGORY_ID_NO_FOUND + subcategory.getId()));
        return subCategoryRepository.save(subcategory);
    }

    public void deleteSubCategory(Subcategory subcategory) {
        subCategoryRepository.findById(subcategory.getId()).orElseThrow(() ->
                new FindException(SUB_CATEGORY_ID_NO_FOUND + subcategory.getId()));
        subcategory.setVisible(false);
        subCategoryRepository.save(subcategory);
    }
}