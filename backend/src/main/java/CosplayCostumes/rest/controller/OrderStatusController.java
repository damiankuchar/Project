package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Condition;
import CosplayCostumes.rest.model.OrderStatus;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.orderStatus.OrderStatusDTO;
import CosplayCostumes.rest.service.OrderStatusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/order-status")
public class OrderStatusController {
    private final OrderStatusService orderStatusService;

    @GetMapping("/get-all-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<List<OrderStatus>> getAllOrderStatues() {
        List<OrderStatus> orderStatus = orderStatusService.findAllOrderStatus();
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }


    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public ResponseEntity<OrderStatus> findOrderStatusById(@PathVariable Long id) {
        OrderStatus orderStatus = orderStatusService.findOrderStatusById(id);
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderStatus> addOrderStatus(@RequestBody OrderStatusDTO orderStatusDTO) {
        OrderStatus newCategory = orderStatusService.addOrderStatus(orderStatusDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderStatus> updateOrderStatus(@RequestBody OrderStatus orderStatus) {
        OrderStatus newCategory = orderStatusService.updateOrderStatus(orderStatus);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/disable-visibility")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteOrderStatus(@RequestBody ModelDTO modelDTO) {
        orderStatusService.deleteOrderStatus(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
