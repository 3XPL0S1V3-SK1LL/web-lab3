package org.ifmo.ru.lab3.convertors;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.convert.Converter;
import jakarta.faces.convert.ConverterException;
import jakarta.faces.convert.FacesConverter;

@FacesConverter("safeDoubleConverter")
public class SafeDoubleConverter implements Converter<String> {

    @Override
    public String getAsObject(FacesContext context, UIComponent component, String value) {
        if (value == null || value.trim().isEmpty()) {
            return "100.0";
        }

        try {
            double v = Double.parseDouble(value.replaceAll(",", "."));
            if (v >= 1 && v <= 4) {
                return value;
            }
            return "100.0";
        } catch (NumberFormatException e) {
            return "100.0";
        }
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, String value) {
        return value != null ? value : "100.0";
    }
}
