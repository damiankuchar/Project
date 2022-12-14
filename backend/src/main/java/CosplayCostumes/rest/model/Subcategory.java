package CosplayCostumes.rest.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "sub_category_t")
@NoArgsConstructor
@Getter
@Setter
public class Subcategory implements Serializable {
    @Id
    @SequenceGenerator(name = "s_sub_category",
            sequenceName = "s_sub_category",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_sub_category"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String code;
    @Column(length=1000)
    private String description;

    private Boolean visible;

    public Subcategory(String code, String description, Category category) {
        this.code = code;
        this.description = description;
        this.category = category;
        this.visible = true;
    }
}
