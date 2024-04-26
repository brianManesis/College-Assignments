package org.assignment;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server {

    private static final int PORT = 8080;
    private static final int THREAD_POOL_SIZE = 10;

    private static ExecutorService executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
    private static Map<String, Boolean> availableSlots = new ConcurrentHashMap<>();

    public static void main(String[] args) {
        // Initialize available slots
        availableSlots.put("Monday", true);
        availableSlots.put("Tuesday", true);
        availableSlots.put("Wednesday", true);
        // Add more slots as needed...

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server is running and listening on port " + PORT);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("New client connected: " + clientSocket);

                executorService.submit(new RequestHandler(clientSocket, availableSlots));
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }
    }
}

