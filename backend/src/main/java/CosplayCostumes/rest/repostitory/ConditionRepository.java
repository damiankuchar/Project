package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.Condition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConditionRepository extends JpaRepository<Condition, Long> {
    Optional<Condition> findById(Long id);

    Optional<Condition> findByCode(String code);
}
