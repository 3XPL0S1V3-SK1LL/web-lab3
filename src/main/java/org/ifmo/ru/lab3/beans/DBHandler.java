package org.ifmo.ru.lab3.beans;

import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

@ManagedBean
@RequestScoped
public class DBHandler {

    private static final String SQL_INSERT = "INSERT INTO points (x, y, r, hit, execution_time, created_at) VALUES (?, ?, ?, ?, ?, ?)";
    private static final String SQL_SELECT_ALL = "SELECT * FROM points";
    private DataSource dataSource;

    public DBHandler() {
        try {
            InitialContext ctx = new InitialContext();
            dataSource = (DataSource) ctx.lookup("java:/PostgresDS");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    public void insertPoint(Point point, long startTime) {
        if (dataSource == null) {
            System.err.println("DataSource is null!");
            return;
        }

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(SQL_INSERT)) {

            double xVal = Double.parseDouble(point.getX().replace(',', '.'));
            double yVal = Double.parseDouble(point.getY().replace(',', '.'));
            double rVal = Double.parseDouble(point.getR().replace(',', '.'));
            boolean hitVal = Boolean.parseBoolean(point.getHit());
            long executionTime = (System.nanoTime() - startTime) / 1000;
            point.setExecutionTime(executionTime);

            stmt.setDouble(1, xVal);
            stmt.setDouble(2, yVal);
            stmt.setDouble(3, rVal);
            stmt.setBoolean(4, hitVal);
            stmt.setLong(5, executionTime);
            stmt.setString(6, point.getCurrentTime());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public List<Point> getAllPoints() {
        List<Point> points = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(SQL_SELECT_ALL);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Point point = new Point();
                point.setX(rs.getString("x"));
                point.setY(rs.getString("y"));
                point.setR(rs.getString("r"));
                point.setHit(rs.getString("hit"));
                point.setExecutionTime(rs.getLong("execution_time"));
                point.setCurrentTime(rs.getString("created_at"));
                points.add(point);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return points;
    }
}
