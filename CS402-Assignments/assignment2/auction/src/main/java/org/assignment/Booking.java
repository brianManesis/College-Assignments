package org.assignment;

import java.util.concurrent.atomic.AtomicBoolean;

public class Booking {
    private final String day;
    private final String time;
    private AtomicBoolean available;

    public Booking (String day, String time){
        this.day = day;
        this.time = time;
        this.available = new AtomicBoolean(true);
    }

    public boolean getAvailable() {
        return available.get();
    }
    public void setAvailable(boolean available){
        this.available.set(available);
    }
}
