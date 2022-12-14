package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
    Optional<OrderStatus> findById(Long id);

    Optional<OrderStatus> findByCode(String code);
    Optional<OrderStatus> findByLevel(int level);
}
