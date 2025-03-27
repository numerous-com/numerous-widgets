"""Example demonstrating the TimelineChart widget."""

from datetime import datetime, timedelta
import random
import numpy as np

from numerous.widgets import TimelineChart


def generate_temperature_data(
    start_hour: datetime,
    end_hour: datetime,
    base_temp: float = 15, 
    amplitude: float = 5, 
    noise: float = 1
) -> list[float]:
    """Generate simulated temperature data with day/night cycle and some noise."""
    hours = int((end_hour - start_hour).total_seconds() / 3600) + 1
    time_points = np.linspace(0, 2 * np.pi, 24)  # One day cycle
    # Repeat the day cycle as needed
    days = hours // 24 + (1 if hours % 24 > 0 else 0)
    time_points = np.tile(time_points, days)[:hours]
    
    # Generate a sine wave with period of 24 hours (day/night cycle)
    # Offset to make cooler at night
    temperature = base_temp + amplitude * np.sin(time_points - np.pi/2)
    
    # Add some noise
    temperature += np.random.normal(0, noise, size=hours)
    
    return temperature.tolist()


def generate_humidity_data(
    start_hour: datetime,
    end_hour: datetime,
    base_humidity: float = 70, 
    amplitude: float = 15, 
    noise: float = 3
) -> list[float]:
    """Generate simulated humidity data, somewhat inverse to temperature."""
    hours = int((end_hour - start_hour).total_seconds() / 3600) + 1
    time_points = np.linspace(0, 2 * np.pi, 24)  # One day cycle
    # Repeat the day cycle as needed
    days = hours // 24 + (1 if hours % 24 > 0 else 0)
    time_points = np.tile(time_points, days)[:hours]
    
    # Generate a sine wave with period of 24 hours, offset from temperature
    humidity = base_humidity - amplitude * np.sin(time_points - np.pi/2)
    
    # Add some noise
    humidity += np.random.normal(0, noise, size=hours)
    
    # Clip to realistic range
    humidity = np.clip(humidity, 30, 100)
    
    return humidity.tolist()


def generate_wind_speed_data(
    start_hour: datetime,
    end_hour: datetime,
    base_speed: float = 10, 
    max_speed: float = 25
) -> list[float]:
    """Generate simulated wind speed with occasional gusts."""
    hours = int((end_hour - start_hour).total_seconds() / 3600) + 1
    wind_speeds = []
    
    for _ in range(hours):
        # Base wind with some small variations
        wind = base_speed + random.uniform(-3, 3)
        
        # Occasional gusts
        if random.random() < 0.2:  # 20% chance of a gust
            wind += random.uniform(0, max_speed - base_speed)
        
        # Ensure non-negative
        wind = max(0, wind)
        wind_speeds.append(round(wind, 1))
    
    return wind_speeds


def generate_power_data(
    start_hour: datetime,
    end_hour: datetime,
    base_load: float = 200, 
    peak_load: float = 400
) -> list[float]:
    """Generate simulated power consumption data with a daily pattern."""
    hours = int((end_hour - start_hour).total_seconds() / 3600) + 1
    power_data = []
    
    for i in range(hours):
        hour_of_day = (start_hour + timedelta(hours=i)).hour
        
        # Higher consumption during day hours
        if 8 <= hour_of_day <= 18:  # Daytime hours
            power = base_load + random.uniform(50, peak_load - base_load)
        elif 19 <= hour_of_day <= 22:  # Evening hours - highest consumption
            power = peak_load - random.uniform(0, 100)
        else:  # Night hours - lowest consumption
            power = base_load - random.uniform(0, base_load * 0.5)
            
        # Add some random variation
        power *= random.uniform(0.95, 1.05)
        
        power_data.append(round(power, 1))
    
    return power_data


def create_timeline_example() -> TimelineChart:
    """Create a timeline chart with multiple charts and different chart types."""
    # Define our timeline periods
    now = datetime.now().replace(minute=0, second=0, microsecond=0)
    
    # Block 1: Yesterday's data
    yesterday_start = now - timedelta(days=1)
    yesterday_end = now - timedelta(hours=1)
    
    # Block 2: Data for the current day
    today_start = now
    today_end = now + timedelta(hours=23)
    
    # Block 3: Forecast for tomorrow
    tomorrow_start = now + timedelta(days=1)
    tomorrow_end = tomorrow_start + timedelta(hours=23)
    
    # Generate all the data for blocks ahead of time
    # Block 1: Yesterday's data
    temperature_data_yesterday = generate_temperature_data(
        yesterday_start, yesterday_end, base_temp=16
    )
    humidity_data_yesterday = generate_humidity_data(
        yesterday_start, yesterday_end, base_humidity=65
    )
    wind_data_yesterday = generate_wind_speed_data(
        yesterday_start, yesterday_end, base_speed=8
    )
    power_data_yesterday = generate_power_data(
        yesterday_start, yesterday_end, base_load=220, peak_load=420
    )
    
    # Block 2: Today's data
    temperature_data_today = generate_temperature_data(
        today_start, today_end, base_temp=18
    )
    humidity_data_today = generate_humidity_data(
        today_start, today_end, base_humidity=68
    )
    wind_data_today = generate_wind_speed_data(
        today_start, today_end, base_speed=10
    )
    power_data_today = generate_power_data(
        today_start, today_end, base_load=200, peak_load=450
    )
    
    # Block 3: Tomorrow's forecast with missing data points (null values)
    temperature_data_tomorrow = generate_temperature_data(
        tomorrow_start, tomorrow_end, base_temp=17
    )
    # Add some gaps (null values)
    for i in range(5, 10):
        temperature_data_tomorrow[i] = None
    
    humidity_data_tomorrow = generate_humidity_data(
        tomorrow_start, tomorrow_end, base_humidity=70
    )
    for i in range(12, 15):
        humidity_data_tomorrow[i] = None
    
    wind_data_tomorrow = generate_wind_speed_data(
        tomorrow_start, tomorrow_end, base_speed=12
    )
    power_data_tomorrow = generate_power_data(
        tomorrow_start, tomorrow_end, base_load=210, peak_load=430
    )
    
    # Block 4: Alternative forecast (dependent on Block 3)
    # Create a modified version of tomorrow's forecast with slightly different values
    temperature_data_alt = temperature_data_tomorrow.copy()
    for i in range(len(temperature_data_alt)):
        if temperature_data_alt[i] is not None:
            # Increase temperature by 2 degrees for this alternative forecast
            temperature_data_alt[i] += 2.0
    
    humidity_data_alt = humidity_data_tomorrow.copy()
    for i in range(len(humidity_data_alt)):
        if humidity_data_alt[i] is not None:
            # Decrease humidity by 5% for this alternative forecast
            humidity_data_alt[i] = max(0, humidity_data_alt[i] - 5.0)
    
    # Define the blocks to be passed to the TimelineChart constructor
    blocks = [
        {
            "id": "block1",
            "name": "Yesterday (Actual)",
            "order": 1,
            "start_hour": yesterday_start.isoformat(),
            "end_hour": yesterday_end.isoformat(),
            "data": {
                "temperature": temperature_data_yesterday,
                "humidity": humidity_data_yesterday,
                "wind": wind_data_yesterday,
                "power": power_data_yesterday
            }
        },
        {
            "id": "block2",
            "name": "Today (Measured + Forecast)",
            "order": 2,
            "start_hour": today_start.isoformat(),
            "end_hour": today_end.isoformat(),
            "data": {
                "temperature": temperature_data_today,
                "humidity": temperature_data_today,
                "wind": wind_data_today,
                "power": power_data_today
            }
        },
        {
            "id": "block3",
            "name": "Tomorrow (Forecast)",
            "order": 3,
            "start_hour": tomorrow_start.isoformat(),
            "end_hour": tomorrow_end.isoformat(),
            "data": {
                "temperature": temperature_data_tomorrow,
                "humidity": humidity_data_tomorrow,
                "wind": wind_data_tomorrow,
                "power": power_data_tomorrow
            }
        },
        {
            "id": "block4",
            "name": "Alternative Forecast",
            "order": 4,
            "start_hour": tomorrow_start.isoformat(),
            "end_hour": tomorrow_end.isoformat(),
            "data": {
                "temperature": temperature_data_alt,
                "humidity": humidity_data_alt,
                "wind": wind_data_tomorrow,  # Using the same wind data
                "power": power_data_tomorrow  # Using the same power data
            },
            "dependencies": ["block3"],  # This block depends on block3
            "isDependent": True,
            "referenceOrder": 3,  # It references block with order 3
            "dependencyType": "version"  # It's an alternative version of block3
        }
    ]
    
    # Generate some additional data for a new channel
    solar_power_data_yesterday = [random.uniform(0, 5) for _ in range(24)]
    solar_power_data_today = [random.uniform(0, 8) for _ in range(24)]
    solar_power_data_tomorrow = [random.uniform(0, 10) for _ in range(24)]
    
    # Add this data to the blocks
    blocks[0]["data"]["solar"] = solar_power_data_yesterday
    blocks[1]["data"]["solar"] = solar_power_data_today
    blocks[2]["data"]["solar"] = solar_power_data_tomorrow
    blocks[3]["data"]["solar"] = solar_power_data_tomorrow  # Same data as the regular forecast
    
    # Create the widget with channel definitions and blocks
    # FEATURE: Multiple charts with different chart types
    # Channels can be assigned to different charts using the 'chart_id' property
    # Each channel can have its own 'chart_type': 'line' or 'bar'
    timeline = TimelineChart(
        channels=[
            # Weather chart - contains temperature and humidity as line charts
            {
                "id": "temperature",
                "name": "Temperature",
                "description": "Outdoor temperature", 
                "unit": "°C",
                "color": "rgba(255, 99, 132, 1)",  # Red
                "chart_id": "weather",  # Assign to weather chart
                "chart_type": "line"    # Line chart
            },
            {
                "id": "humidity",
                "name": "Humidity", 
                "description": "Relative humidity",
                "unit": "%",
                "color": "rgba(54, 162, 235, 1)",  # Blue
                "chart_id": "weather",  # Assign to weather chart
                "chart_type": "line"    # Line chart
            },
            # Weather chart - wind speed as a bar chart
            {
                "id": "wind",
                "name": "Wind Speed",
                "description": "Wind speed measurement",
                "unit": "m/s",
                "color": "rgba(75, 192, 192, 1)",  # Green
                "chart_id": "weather",  # Assign to weather chart
                "chart_type": "bar"     # Bar chart - mixed with lines in the same chart
            },
            # Energy chart - power consumption as a bar chart
            {
                "id": "power",
                "name": "Power Consumption",
                "description": "Electrical power consumption",
                "unit": "kW",
                "color": "rgba(153, 102, 255, 1)",  # Purple
                "chart_id": "energy",   # Assign to energy chart
                "chart_type": "bar"     # Bar chart
            },
            # Energy chart - solar generation as a line chart
            {
                "id": "solar",
                "name": "Solar Generation",
                "description": "Solar power generation",
                "unit": "kW",
                "color": "rgba(255, 159, 64, 1)",  # Orange
                "chart_id": "energy",   # Same chart as power
                "chart_type": "line"    # But using a line chart
            }
        ],
        blocks=blocks,  # Pass blocks during initialization
        view_mode="rendered",  # Start in rendered mode to show all charts
        selected_channel_id="temperature"  # Start with temperature selected
    )
    
    # Configure chart options for better display
    timeline.update_chart_options({
        "plugins": {
            "legend": {
                "position": "top"
            },
            "title": {
                "display": True,
                "text": "Weather and Energy Timeline"
            }
        }
    })
    
    # Demonstration of adding a dependent block after initialization
    # This creates a "gap-filling" extension for tomorrow's forecast where data is missing
    gap_filler_data = {
        "temperature": [None] * 24,  # Initialize with all nulls
        "humidity": [None] * 24      # Initialize with all nulls
    }
    
    # Fill in only the gaps that exist in the original forecast
    for i in range(5, 10):
        gap_filler_data["temperature"][i] = 18.5  # Some reasonable value to fill gaps
    
    for i in range(12, 15):
        gap_filler_data["humidity"][i] = 65.0  # Some reasonable value to fill gaps
    
    # Add the gap filler block as an "extension" type dependent block
    extension_block_id = timeline.add_data_block(
        start_hour=tomorrow_start,
        end_hour=tomorrow_end,
        data=gap_filler_data,
        name="Gap Filler",
        order=5,  # Higher order than the original forecast
        dependencies=["block3"],  # Depends on the original forecast
        is_dependent=True,
        dependency_type="extension"  # This block extends/fills gaps in block3
    )
    
    print("TimelineChart widget created with multiple charts and different chart types")
    print(f"Total blocks: {len(timeline.blocks)}")
    
    # Print summary of blocks
    for i, block in enumerate(timeline.blocks):
        dependency_info = ""
        if block.get("dependencies"):
            dep_type = block.get("dependencyType", "dependent")
            dep_refs = block.get("dependencies", [])
            dependency_info = f" ({dep_type} of {', '.join(dep_refs)})"
        
        print(f"Block {i+1}: {block['name']}{dependency_info} (ID: {block['id']})")
    
    # Print summary of channels and their chart assignments
    print("\nChannels by chart:")
    chart_groups = {}
    for channel in timeline.channels:
        chart_id = channel.get("chart_id", "main")
        if chart_id not in chart_groups:
            chart_groups[chart_id] = []
        chart_groups[chart_id].append(channel)
    
    for chart_id, channels in chart_groups.items():
        print(f"\nChart '{chart_id}':")
        for channel in channels:
            print(f"  - {channel['name']} ({channel['chart_type']} chart)")
    
    # Demonstrate updating a channel's chart type
    print("\nDEMONSTRATION: Updating channel chart types")
    print(f"Temperature chart type before: {timeline.channels[0]['chart_type']}")
    timeline.update_channel_chart(channel_id="temperature", chart_type="bar")
    print(f"Temperature chart type after: {timeline.channels[0]['chart_type']}")
    
    # Demonstrate moving a channel to a different chart
    print("\nDEMONSTRATION: Moving a channel to a different chart")
    print(f"Humidity chart assignment before: {timeline.channels[1]['chart_id']}")
    timeline.update_channel_chart(channel_id="humidity", chart_id="energy")
    print(f"Humidity chart assignment after: {timeline.channels[1]['chart_id']}")
    
    # Create a new chart with one channel in it
    print("\nDEMONSTRATION: Creating a new chart")
    print("Moving Wind Speed to a new 'wind-only' chart")
    timeline.update_channel_chart(channel_id="wind", chart_id="wind-only")
    
    # Change to channel view mode to demonstrate how to view individual channels
    print("\nChanging to channel view mode to demonstrate individual channel viewing")
    timeline.set_view_mode("channel")
    timeline.set_selected_channel("temperature")
    
    # Demonstrate saving and loading functionality
    print("\nDEMONSTRATION: Saving and loading timeline data")
    
    try:
        # Check that HDF5 dependencies are available (raises ImportError if not)
        timeline.require_h5py()
        
        # Save the timeline data (HDF5 with JSON metadata)
        timeline.save_data("timeline_data")
        
        # Load data from the saved files
        loaded_timeline = TimelineChart.load_data("timeline_data")
        
        print(
            f"Successfully loaded timeline with {len(loaded_timeline.channels)} channels "
            f"and {len(loaded_timeline.blocks)} blocks"
        )
    except ImportError as e:
        print(f"Cannot save/load data: {e}")
        print("Please install h5py and numpy: pip install h5py numpy")
    except Exception as e:
        print(f"Error during data save/load: {e}")
    
    return timeline


# Create and display the example when run directly
if __name__ == "__main__":
    timeline_chart = create_timeline_example()
    
    # In a notebook or app, you would display the widget like this:
    # display(timeline_chart)
    
    print("\nTimelineChart widget created with the following features:")
    print("1. Multiple charts - channels are grouped into 'weather', 'energy', and 'wind-only' charts")
    print("2. Mixed chart types - both line and bar charts can be used in the same chart")
    print("3. View modes - 'channel' shows a single channel, 'rendered' shows all charts")
    print("4. Chart type controls - click 'Show Chart Controls' to change chart types and assignments")
    print(f"\nThe widget has {len(timeline_chart.channels)} channels and {len(timeline_chart.blocks)} data blocks.")
    print("\nIn a notebook, run 'display(timeline_chart)' to see it.") 