const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
    host: 'localhost', // Redis server host
    port: 6379 // Redis server port
});

// Log errors if any
client.on("error", function(error) {
    console.error("Error encountered:", error);
});

// Log a message when connected successfully
client.on("connect", function() {
    console.log("Connected to Redis server successfully!");

    // Example usage: set a key-value pair
    client.set("name", "ankush", function(error, reply) {
        if (error) {
            console.error("Error setting key:", error);
        } else {
            console.log("Key set successfully!");
            asyncOperationCompleted(); // Decrement async operations count
        }
    });

    // Example usage: get the value of a key
    client.get("name", function(error, reply) {
        if (error) {
            console.error("Error getting value for key:", error);
        } else {
            console.log("Value for key 'name' is:", reply);
            asyncOperationCompleted(); // Decrement async operations count
        }
    });
});

// Function to decrement the async operations count and quit the client when all operations are completed
function asyncOperationCompleted() {
    asyncOperationsCount--;

    if (asyncOperationsCount === 0) {
        // Quit the client connection
        client.quit(function(error, reply) {
            if (error) {
                console.error("Error quitting client:", error);
            } else {
                console.log("Client connection closed successfully!");
            }

            // Exit the Node.js process
            process.exit();
        });
    }
}

// Add console logs to check if the script is working
console.log("Starting the script...");
console.log("asyncOperationsCount:", asyncOperationsCount);
