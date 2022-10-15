package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.Order;
import CosplayCostumes.app.model.Product;
import CosplayCostumes.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findById(Long id);

    @Query("SELECT o FROM Order o WHERE o.user = :user and o.product = :product")
    Optional<List<Order>> findOrderByUserAndProduct(
            @Param("user") User user,
            @Param("product") Product product);
}
