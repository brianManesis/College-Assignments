package org.assignment;

import java.io.*;
import java.net.Socket;

import java.util.Map;

public class RequestHandler implements Runnable {

    private final Socket clientSocket;
    private final Map<String, Boolean> availableSlots;

    public RequestHandler(Socket clientSocket, Map<String, Boolean> availableSlots) {
        this.clientSocket = clientSocket;
        this.availableSlots = availableSlots;
    }

    @Override
    public void run() {
        try (
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))
        ) {
                out.println(getSlotTimes());

                String inputLine;
                while (!(inputLine = in.readLine()).equals("exit")) {
                    System.out.println("Received from client: " + inputLine);
                    String[] tokens = inputLine.split("\\s+");
                    System.out.println(tokens[0]);

                    if (tokens.length != 2 || !tokens[0].equalsIgnoreCase("BOOK")) {
                        out.println("Invalid request format. Please use 'BOOK <day>' to book an appointment slot.");
                        continue;
                    }

                    String day = tokens[1];
                    if (!availableSlots.containsKey(day)) {
                        out.println("Invalid day. Available slots are for: " + availableSlots.keySet());
                        continue;
                    }

                    boolean selectedAvailability = availableSlots.get(day);
                    if (selectedAvailability == false) {
                        out.println(getSlotTimes().append("Slot no longer available " + day));

                        continue;
                    }

                    // Book the slot
                    availableSlots.put(day, false);
                    out.println("Successfully booked a slot for " + day);
                }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                System.out.println("Client closing");
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    private StringBuilder getSlotTimes(){
        StringBuilder slotsResponse = new StringBuilder("======== Available Slots ======");
        for (Map.Entry<String, Boolean> slot : availableSlots.entrySet()) {
            String day = slot.getKey();
            boolean available = slot.getValue();

            slotsResponse.append("Day: " + day + ", Available: " + available + "");
        }
        return slotsResponse.append("Please book a time by entering BOOK <day>");
    }
}
