package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.Quality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QualityRepository extends JpaRepository<Quality, Long> {
    Optional<Quality> findById(Long id);

    Optional<Quality> findByCode(String code);

}
