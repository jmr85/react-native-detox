import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import textareaTemplate from "./templates/Textarea";

export const AddReviewRestaurantStruct = t.struct({
  title: t.String,
  review: t.String
});

export const AddReviewRestaurantOptions = {
  fields: {
    title: {
      template: inputTemplate,
      config: {
        placeholder: "Titulo de la opinión",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    review: {
      template: textareaTemplate,
      config: {
        placeholder: "Opcinión"
      }
    }
  }
};
