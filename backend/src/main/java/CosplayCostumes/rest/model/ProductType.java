package CosplayCostumes.rest.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "product_type_t")
@NoArgsConstructor
@Getter
@Setter
public class ProductType implements Serializable {
    @Id
    @SequenceGenerator(name = "s_product_type",
            sequenceName = "s_product_type",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_product_type"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    private String code;
    private Boolean visible;

    public ProductType(String code) {
        this.code = code;
        this.visible = true;
    }
}
