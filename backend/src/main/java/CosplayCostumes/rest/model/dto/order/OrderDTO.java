package CosplayCostumes.rest.model.dto.order;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderDTO {
    private Long productID;
    private Long userID;
}
