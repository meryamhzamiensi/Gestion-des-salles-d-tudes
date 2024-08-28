#include <WiFi.h>
#include <UbidotsESPMQTT.h>

// Informations Wi-Fi
const char* ssid = "TOPNET_EE30";
const char* password = "****";

// Informations Ubidots
#define UBIDOTS_TOKEN "BBUS-8HLdoXmIzsPcMMs9I4f2t8F9uLpZpZ"
#define UBIDOTS_DEVICE "Salle1" 

// Initialize Ubidots
Ubidots ubidots(UBIDOTS_TOKEN);

// Initialiser le capteur DHT
#define DHTPIN 15 
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Pins des capteurs
const int lightSensorPin = 34;  // LDR AO
const int potentiometerPin = 35; // Potentiomètre

void setup() {
  Serial.begin(115200);

  // Connexion Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize DHT sensor
  dht.begin();

  // Initialize Ubidots
  ubidots.setDebug(true);
}

void loop() {
  // Read sensor values
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int lightLevel = analogRead(lightSensorPin);
  int noiseLevel = analogRead(potentiometerPin); // Potentiometer used as noise level sensor

  // Check DHT sensor readings
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Send data to Ubidots
  ubidots.add(temperature, temperature, salle1); 
  ubidots.add(noise, noiseLevel, salle1); 
  ubidots.add(eclairage, lightLevel, salle1); 

  if (ubidots.send()) {
    Serial.println("Data sent to Ubidots");
  } else {
    Serial.println("Failed to send data to Ubidots");
  }

  // Display data on Serial Monitor
  Serial.print("Temperature: ");
  Serial.println(temperature);
  Serial.print("Humidity: ");
  Serial.println(humidity);
  Serial.print("Light Level: ");
  Serial.println(lightLevel);
  Serial.print("Noise Level: ");
  Serial.println(noiseLevel);

  delay(2000); // Wait 2 seconds before next reading
}
