package org.ifmo.ru.lab3.beans;

import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Named("point")
@SessionScoped
public class PointBean implements Serializable {
    private Point point;
    private List<Point> points = new ArrayList<>();

    private DBHandler dbHandler = new DBHandler();

    public PointBean() {
        this.point = new Point();
        this.points = dbHandler.getAllPoints();
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public void addPoint() {
        FacesContext context = FacesContext.getCurrentInstance();
        boolean valid = true;

        if (point.getX() == null) {
            context.addMessage("form:x", new FacesMessage(FacesMessage.SEVERITY_ERROR, "X value is incorrect", null));
            valid = false;
        }

        if (point.getY() == null) {
            context.addMessage("form:y", new FacesMessage(FacesMessage.SEVERITY_ERROR, "Y value is incorrect", null));
            valid = false;
        }

        if (point.getR() == null) {
            context.addMessage("form:r", new FacesMessage(FacesMessage.SEVERITY_ERROR, "R value is incorrect", null));
            valid = false;
        }

        if (!valid) {
            System.out.println("Wrong data");
            return;
        }

        long startTime = System.nanoTime();
        point.setHit(point.isHit());
        point.setCurrentTime(LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));

        dbHandler.insertPoint(point, startTime);
        this.points = dbHandler.getAllPoints();
    }

    public List<Point> getPoints() {
        return points;
    }
}
