package org.ifmo.ru.lab3.beans;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Point {
    private String x = "4.0";
    private String y = "2.0";
    private String r = "2.0";
    private String hit = "false";
    private String currentTime;
    private long executionTime;
    private long id = 0;

    public Point(Point other) {
        this.x = other.x;
        this.y = other.y;
        this.r = other.r;
        this.hit = isHit();
        id++;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    public long getId() {
        return id;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public Point() {}

    public String getX() {
        return x;
    }

    public void setX(String x) {
        try {
            double xd = Double.parseDouble(x);
            if (xd >= -5 && xd <= 5) {
                this.x = x;
            }
            else this.x = null;
        } catch (NumberFormatException e) {
            this.x = null;
        }
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        try {
            double yd = Double.parseDouble(y);
            if (yd >= -5 && yd <= 3) {
                this.y = y;
            }
            else this.y = null;
        } catch (NumberFormatException e) {
            this.y = null;
        }
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        try {
            double rd = Double.parseDouble(r);
            if (rd >= 1 && rd <= 4 || rd == 100) {
                this.r = r;
            }
            else this.r = null;
        } catch (NumberFormatException e) {
            this.r = null;
        }
    }

    public String getHit() {
        return hit;
    }
    public void setHit(String hit) {
        this.hit = hit;
    }

    public String isHit() {
        if (x == null || y == null || r == null) {
            return null;
        }
        try {
            double x = Double.parseDouble(this.x.replaceAll(",", "."));
            double y = Double.parseDouble(this.y.replaceAll(",", "."));
            double r = Double.parseDouble(this.r.replaceAll(",", "."));
            if (x >= 0 && y >= 0) return ((Boolean) false).toString();
            if (x > 0 && y < 0) return ((Boolean) (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2))).toString();
            if (x < 0 && y < 0) return ((Boolean) (y >= -x - r)).toString();
            return ((Boolean) (Math.abs(x) <= r && Math.abs(y) <= r)).toString();
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public String toString() {
        return "Point{" +
                "x='" + x + '\'' +
                ", y='" + y + '\'' +
                ", r='" + r + '\'' +
                ", hit='" + hit + '\'' +
                ", currentTime='" + currentTime + '\'' +
                ", executionTime=" + executionTime +
                '}';
    }

    public void setCurrentTime(String createdAt) {
        this.currentTime = createdAt;
    }
}
