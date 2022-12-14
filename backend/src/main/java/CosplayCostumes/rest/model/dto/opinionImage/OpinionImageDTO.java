package CosplayCostumes.rest.model.dto.opinionImage;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class OpinionImageDTO implements Serializable {
    private Long opinionId;
    private String fileUrl;
}
