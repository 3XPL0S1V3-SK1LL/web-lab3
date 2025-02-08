package org.ifmo.ru.lab3.validators;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.Validator;
import jakarta.faces.validator.ValidatorException;
import jakarta.faces.validator.FacesValidator;

@FacesValidator("doubleRangeValidator")
public class RValidator implements Validator<Object> {

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        if (value == null || value.toString().trim().isEmpty()) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "Значение не может быть пустым", null));
        }

        try {
            double val = Double.parseDouble(value.toString());
            if (val < 1.0 || val > 4.0) {
                throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "Значение должно быть в диапазоне от 1.0 до 4.0", null));
            }
        } catch (NumberFormatException e) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "Введите корректное число", null));
        }
    }
}
