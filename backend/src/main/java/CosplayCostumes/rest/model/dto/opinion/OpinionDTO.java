package CosplayCostumes.rest.model.dto.opinion;

import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Set;

@Data
public class OpinionDTO {
    private Long id;
    private String userEmail;
    private Long ProductID;
    @Min(1)
    @Max(5)
    private Double value;
    private String description;
    private Set<OpinionImageDTO> opinionImages;
}
