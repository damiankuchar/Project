package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.opinion.OpinionDTO;
import CosplayCostumes.rest.model.dto.opinion.OpinionRequest;
import CosplayCostumes.rest.model.dto.opinion.OpinionResponse;
import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
import CosplayCostumes.rest.service.OpinionImageService;
import CosplayCostumes.rest.service.OpinionService;
import CosplayCostumes.rest.service.ProductService;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/opinion")
public class OpinionController {
    private final OpinionService opinionService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Opinion>> getAllOpinions() {
        List<Opinion> opinions = opinionService.findAllOpinion();
        return new ResponseEntity<>(opinions, HttpStatus.OK);
    }

    @PostMapping("/add-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Opinion> addOpinion(@RequestBody OpinionRequest opinionDTO) {
        User user = userService.findUserByEmail(opinionDTO.getEmailUser());
        Product product = productService.findProductById(opinionDTO.getProductID());

        Opinion opinion = opinionService.addOpinion(opinionDTO, user, product);
        Opinion response = opinionService.findOpinionById(opinion.getId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionResponse> updateOpinion(@RequestBody OpinionDTO opinionDTO) {
        Opinion opinion = opinionService.updateOpinion(opinionDTO);

        return new ResponseEntity<>(opinionMapper(opinion, new HashSet<>()), HttpStatus.OK);
    }

    @DeleteMapping("/disable-visibility-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteOpinion(@RequestBody ModelDTO modelDTO) {
        opinionService.deleteOpinion(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }

    private OpinionResponse opinionMapper(Opinion opinion, Set<OpinionImageDTO> images) {
        return new OpinionResponse(opinion.getId(), opinion.getUser().getEmail(),
                opinion.getProduct().getId(), opinion.getProduct().getCode(), opinion.getValue(), opinion.getDescription(), images);

    }
}
