package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.repostitory.OpinionImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class OpinionImageService {
    private final static String OPINION_IMAGE_NO_FOUND = "Failed to find opinion image ";
    private final static String OPINION_IMAGE_EXIST = "Opinion image with this name with this name is exist ";
    private final OpinionImageRepository opinionImageRepository;

    public List<OpinionImage> findAllOpinionImage() {
        return opinionImageRepository.findAll();
    }
    public OpinionImage findOpinionImageById(Long id) {
        return opinionImageRepository.findById(id).orElseThrow(() -> new NotFoundException(OPINION_IMAGE_EXIST));
    }

    public OpinionImage findOpinionImageByCode(String code) throws Exception {
        return opinionImageRepository.findByCode(code).orElseThrow(() -> new Exception(OPINION_IMAGE_NO_FOUND + code));
    }

    public OpinionImage addOpinionImage(String code, Opinion opinion) {
        if (opinionImageRepository.findByCode(code).isPresent())
            throw new FindException(OPINION_IMAGE_EXIST + code);

        OpinionImage newOpinionImage = new OpinionImage();
        newOpinionImage.setOpinion(opinion);
        newOpinionImage.setCode(code);
        newOpinionImage.setVisible(true);

        return opinionImageRepository.save(newOpinionImage);
    }

    public OpinionImage updateOpinionImage(OpinionImage opinionImage) {
        if (opinionImageRepository.findByCode(opinionImage.getCode()).isEmpty())
            throw new FindException(OPINION_IMAGE_EXIST + opinionImage.getCode());
        return opinionImageRepository.save(opinionImage);
    }

    public void deleteOpinionImage(OpinionImage opinionImage) {
        if (opinionImageRepository.findByCode(opinionImage.getCode()).isEmpty())
            throw new FindException(OPINION_IMAGE_EXIST + opinionImage.getCode());

        opinionImageRepository.delete(opinionImage);
    }
}
