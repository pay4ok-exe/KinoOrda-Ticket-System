import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicInteger;

public class CinemaTicketSystem {
    private final Map<Integer, String> movies = new HashMap<>();
    private final Map<Integer, String> users = new HashMap<>();
    private final Map<Integer, Integer[]> tickets = new HashMap<>();
    private final AtomicInteger movieIdGenerator = new AtomicInteger(1);
    private final AtomicInteger userIdGenerator = new AtomicInteger(1);
    private final AtomicInteger ticketIdGenerator = new AtomicInteger(1);

    public int addMovie(String movieName) {
        int id = movieIdGenerator.getAndIncrement();
        movies.put(id, movieName);
        System.out.println("Movie added with ID: " + id);
        return id;
    }

    public void showAllMovies() {
        if (movies.isEmpty()) {
            System.out.println("No movies available.");
        } else {
            movies.forEach((id, name) -> System.out.println(id + ". " + name));
        }
    }

    public int addUser(String userName) {
        int id = userIdGenerator.getAndIncrement();
        users.put(id, userName);
        System.out.println("User '" + userName + "' added with ID: " + id);
        return id;
    }

    public int buyTicket(int userId, int movieId) {
        if (!users.containsKey(userId) || !movies.containsKey(movieId)) {
            System.out.println("Invalid user ID or movie ID");
            return -1;
        }
        int ticketId = ticketIdGenerator.getAndIncrement();
        tickets.put(ticketId, new Integer[] {userId, movieId});
        System.out.println("Ticket purchased successfully for User ID " + userId + " for Movie ID " + movieId);
        return ticketId;
    }

    public boolean cancelTicket(int ticketId) {
        if (tickets.containsKey(ticketId)) {
            tickets.remove(ticketId);
            System.out.println("Ticket cancelled successfully!");
            return true;
        } else {
            System.out.println("Ticket not found!");
            return false;
        }
    }

    public static void main(String[] args) {
        CinemaTicketSystem cinemaSystem = new CinemaTicketSystem();
        Scanner scanner = new Scanner(System.in);
        String input;
        do {
            System.out.println("\nAvailable Functions:");
            System.out.println("1. Add new movie");
            System.out.println("2. Show all movies");
            System.out.println("3. Add new user");
            System.out.println("4. Buy ticket");
            System.out.println("5. Cancel ticket");
            System.out.println("0. Exit");
            System.out.print("Choose an option: ");
            input = scanner.nextLine();

            switch (input) {
                case "1":
                    System.out.print("Enter movie name: ");
                    String movieName = scanner.nextLine();
                    cinemaSystem.addMovie(movieName);
                    break;
                case "2":
                    cinemaSystem.showAllMovies();
                    break;
                case "3":
                    System.out.print("Enter user name: ");
                    String userName = scanner.nextLine();
                    cinemaSystem.addUser(userName);
                    break;
                case "4":
                    System.out.print("Enter user ID: ");
                    int userId = scanner.nextInt();
                    System.out.print("Enter movie ID: ");
                    int movieId = scanner.nextInt();
                    scanner.nextLine();  // consume the rest of the line
                    cinemaSystem.buyTicket(userId, movieId);
                    break;
                case "5":
                    System.out.print("Enter ticket ID: ");
                    int ticketId = scanner.nextInt();
                    scanner.nextLine();  // consume the rest of the line
                    cinemaSystem.cancelTicket(ticketId);
                    break;
                case "0":
                    System.out.println("Exiting program.");
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        } while (!input.equals("0"));

        scanner.close();
    }
}
