import marimo

__generated_with = "0.11.14"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo

    import numerous.widgets as wi

    aw = mo.ui.anywidget
    ht = mo.Html
    from page import page
    return aw, ht, mo, page, wi


@app.cell
def _(timeline_chart):
    timeline_chart.save_data("timeline_data")
    return


@app.cell
def _(aw, datetime, timedelta, wi):
    """Example demonstrating the TimelineChart widget."""

    import random
    import numpy as np



    def generate_temperature_data(start_hour, end_hour, base_temp=15, amplitude=5, noise=1):
        """Generate simulated temperature data with day/night cycle and some noise."""
        hours = int((end_hour - start_hour).total_seconds() / 3600) + 1
        time_points = np.linspace(0, 2 * np.pi, 24)  # One day cycle
        # Repeat the day cycle as needed
        days = hours // 24 + (1 if hours % 24 > 0 else 0)
        time_points = np.tile(time_points, days)[:hours]

        # Generate a sine wave with period of 24 hours (day/night cycle)
        temperature = base_temp + amplitude * np.sin(time_points - np.pi/2)  # Offset to make cooler at night

        # Add some noise
        temperature += np.random.normal(0, noise, size=hours)

        return temperature.tolist()


    def generate_humidity_data(start_hour, end_hour, base_humidity=70, amplitude=15, noise=3):
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


    def generate_wind_speed_data(start_hour, end_hour, base_speed=10, max_speed=25):
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


    def generate_power_data(start_hour, end_hour, base_load=200, peak_load=400):
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


    def create_timeline_example():
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
        temperature_data_yesterday = generate_temperature_data(yesterday_start, yesterday_end, base_temp=16)
        humidity_data_yesterday = generate_humidity_data(yesterday_start, yesterday_end, base_humidity=65)
        wind_data_yesterday = generate_wind_speed_data(yesterday_start, yesterday_end, base_speed=8)
        power_data_yesterday = generate_power_data(yesterday_start, yesterday_end, base_load=220, peak_load=420)

        # Block 2: Today's data
        temperature_data_today = generate_temperature_data(today_start, today_end, base_temp=18)
        humidity_data_today = generate_humidity_data(today_start, today_end, base_humidity=68)
        wind_data_today = generate_wind_speed_data(today_start, today_end, base_speed=10)
        power_data_today = generate_power_data(today_start, today_end, base_load=200, peak_load=450)

        # Block 3: Tomorrow's forecast with missing data points (null values)
        temperature_data_tomorrow = generate_temperature_data(tomorrow_start, tomorrow_end, base_temp=17)
        # Add some gaps (null values)
        for i in range(5, 10):
            temperature_data_tomorrow[i] = None

        humidity_data_tomorrow = generate_humidity_data(tomorrow_start, tomorrow_end, base_humidity=70)
        for i in range(12, 15):
            humidity_data_tomorrow[i] = None

        wind_data_tomorrow = generate_wind_speed_data(tomorrow_start, tomorrow_end, base_speed=12)
        power_data_tomorrow = generate_power_data(tomorrow_start, tomorrow_end, base_load=210, peak_load=430)

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
        timeline =aw(wi.TimelineChart(
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
        ))

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

        return timeline


    # Create and display the example when run directly
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
    timeline_chart
    return (
        create_timeline_example,
        generate_humidity_data,
        generate_power_data,
        generate_temperature_data,
        generate_wind_speed_data,
        np,
        random,
        timeline_chart,
    )


@app.cell
def _(aw, datetime, now, timedelta):
    from numerous.widgets import PlannerWidget

    # Define item types with custom fields
    item_types = [
        {
            "id": "meeting",
            "name": "Meeting",
            "fields": [
                {"name": "location", "type": "string", "default": "Office"},
                {"name": "participants", "type": "string", "default": ""}
            ]
        },
        {
            "id": "task",
            "name": "Task",
            "fields": [
                {"name": "priority", "type": "number", "default": 2},
                {"name": "completed", "type": "boolean", "default": False}
            ]
        },
        {
            "id": "appointment",
            "name": "Appointment",
            "fields": [
                {"name": "location", "type": "string", "default": ""},
                {"name": "contact", "type": "string", "default": ""}
            ]
        }
    ]

    # Create some sample items
    _now = datetime.now()
    tomorrow = _now + timedelta(days=1)
    next_week = _now + timedelta(days=7)

    # Create the planner widget
    planner = aw(PlannerWidget(item_types=item_types))

    # Add some sample events programmatically
    planner.add_calendar_item(
        title="Team Meeting",
        start_time=now.replace(hour=10, minute=0),
        end_time=now.replace(hour=11, minute=0),
        item_type="meeting",
        description="Weekly team sync",
        recurrence="weekly",
        custom_fields={
            "location": "Conference Room A",
            "participants": "Engineering Team"
        }
    )

    planner.add_calendar_item(
        title="Finish Project Proposal",
        start_time=tomorrow.replace(hour=14, minute=0),
        end_time=tomorrow.replace(hour=16, minute=0),
        item_type="task",
        description="Complete and send to the client",
        custom_fields={
            "priority": 1,
            "completed": False
        }
    )

    planner.add_calendar_item(
        title="Dentist Appointment",
        start_time=next_week.replace(hour=9, minute=0),
        end_time=next_week.replace(hour=10, minute=0),
        item_type="appointment",
        description="Regular checkup",
        custom_fields={
            "location": "123 Medical Plaza",
            "contact": "Dr. Smith"
        }
    )

    # Display the planner widget
    planner
    return PlannerWidget, item_types, next_week, planner, tomorrow


@app.cell
def _(aw, wi):
    """Example of using the LoadSaveWidget."""

    import time
    import uuid
    from typing import Dict, List, Optional, Tuple, Any

    class ConfigManager:
        """Simple example class to manage configurations."""

        def __init__(self) -> None:
            """Initialize the configuration manager."""
            self.configs: Dict[str, Dict[str, Any]] = {
                "config-1": {
                    "id": "config-1",
                    "label": "Basic Configuration",
                    "settings": {
                        "param1": 5,
                        "param2": "test",
                        "param3": True
                    }
                },
                "config-2": {
                    "id": "config-2",
                    "label": "Advanced Configuration",
                    "settings": {
                        "param1": 10,
                        "param2": "advanced",
                        "param3": False,
                        "param4": 3.14
                    }
                }
            }
            print(self.configs)
            self.current_config: Optional[Dict[str, Any]] = None
            self.current_config_id: Optional[str] = None
            self.modified: bool = False

        def get_configs(self) -> List[Dict[str, str]]:
            """Get list of configurations for display in the widget."""
            print("Config manager: Widget requested configs")
            return [
                {"id": config["id"], "label": config["label"]}
                for config in self.configs.values()
            ]

        def load_config(self, config_id: str) -> Tuple[bool, Optional[str]]:
            """Load a configuration by ID."""
            if config_id in self.configs:
                self.current_config = self.configs[config_id].copy()
                self.current_config_id = config_id
                self.modified = False
                return True, f"Loaded **{self.current_config['label']}** successfully"
            return False, "Configuration not found"

        def save_config(self, force: bool = False) -> Tuple[bool, Optional[str]]:
            """Save the current configuration.

            Args:
                force: Whether to force a save even if the content appears unmodified.
                       This is used for Save As operations.
            """
            print(f"Config manager: Widget request save configs, force: {force}")

            if self.current_config and self.current_config_id:
                if self.modified or force:
                    self.configs[self.current_config_id] = self.current_config.copy()
                    self.modified = False
                    time.sleep(0.5)  # Simulate a delay for saving
                    print(self.configs)
                    return True, f"Configuration **{self.current_config['label']}** saved successfully"
                return True, None  # No changes to save
            return False, "No configuration to save"

        def reset_config(self) -> Tuple[bool, Optional[str]]:
            """Reset the current configuration."""
            print("Config manager: Widget requested reset")

            if self.current_config_id:
                self.current_config = self.configs[self.current_config_id].copy()
                self.modified = False
                return True, "Configuration reset successfully"
            return False, "No configuration to reset"

        def modify_config(self, change: Dict[str, Any]) -> str:
            """Make changes to the current configuration."""
            print("Config manager: App modified item - updating data structure")

            if not self.current_config:
                return "No configuration loaded"

            # Apply changes to the configuration
            if "settings" in self.current_config:
                for key, value in change.items():
                    self.current_config["settings"][key] = value

            self.modified = True
            return f"Changed {len(change)} parameter(s)"

        def search_configs(self, query: str) -> List[Dict[str, str]]:
            """Search configurations by name."""
            print("Config manager: Widget requested search")

            if not query:
                return self.get_configs()

            return [
                {"id": config["id"], "label": config["label"]}
                for config in self.configs.values()
                if query.lower() in config["label"].lower()
            ]

        def create_new_config(self, name: str) -> Tuple[Dict[str, str], bool, Optional[str]]:
            """Create a new configuration.

            Args:
                name: Name for the new configuration
                is_save_as: Whether this is a Save As operation, in which case we should
                           copy the current configuration's content
            """
            print("Config manager: Widget requested create new config")

            config_id = f"config-{str(uuid.uuid4())[:8]}"


            # For regular new config, create with default values
            new_config = {
                "id": config_id,
                "label": name,
                "settings": {
                    "param1": 0,
                    "param2": "",
                    "param3": False
                }
            }

            self.configs[config_id] = new_config

            return {"id": config_id, "label": name}, True, f"Created new configuration: **{name}**"


    # Create a configuration manager
    config_manager = ConfigManager()

    # Create a widget
    load_save_widget = aw(wi.LoadSaveWidget(
        items=config_manager.get_configs(),
        on_load=config_manager.load_config,
        on_save=config_manager.save_config,
        on_reset=config_manager.reset_config,
        on_search=config_manager.search_configs,
        on_new=config_manager.create_new_config,
        default_new_item_name="New Configuration"
    ))
    return (
        Any,
        ConfigManager,
        Dict,
        List,
        Optional,
        Tuple,
        config_manager,
        load_save_widget,
        time,
        uuid,
    )


@app.cell
def _(aw, config_manager, load_save_widget, wi):
    def on_click_modify(event):
        # Simulate some changes
        note = config_manager.modify_config({"param1": 15})
        load_save_widget.set_modified(True, note)

    modify_button = aw(wi.Button(label="Modify", on_click=on_click_modify))
    return modify_button, on_click_modify


@app.cell
def _(
    accordion,
    chat,
    check_box,
    counter,
    fit_to_content_checkbox,
    ht,
    increment_counter,
    inline_label_checkbox,
    load_save_widget,
    make_a_change,
    map,
    md,
    modify_button,
    page,
    picker,
    picker_range,
    project_widget,
    radio,
    selection_widget,
    slider,
    string_input,
    table,
    tabs,
    task_button,
    toggle_button,
    tree,
    widget_html,
):
    ht(
        page(
            tabs=tabs,
            show_basic=tabs.active_tab == "Basic",
            show_map=tabs.active_tab == "Map",
            show_accordion_tab=tabs.active_tab == "Accordion",
            show_projects=tabs.active_tab == "Projects",
            show_task=tabs.active_tab == "Task",
            show_table=tabs.active_tab == "Table",
            show_markdown=tabs.active_tab == "Markdown",
            show_chat = tabs.active_tab == "Chat",
            show_tree = tabs.active_tab == "Tree",
            show_html_template = tabs.active_tab == "HTML Template",
            show_load_save = tabs.active_tab == "LoadSave", 
            counter=counter,
            increment_counter=increment_counter,
            selection_widget=selection_widget,
            map_widget=map,
            string_input=string_input,
            accordion=accordion,
            show_accordion=accordion.expanded,
            project_widget=project_widget,
            toggle_button=toggle_button,
            radio=radio,
            slider=slider,
            picker=picker,
            picker_range=picker_range,
            table=table,
            markdown=md,
            chat=chat,
            task=task_button,
            make_a_change=make_a_change,
            tree=tree,
            html_template=widget_html,
            check_box=check_box,
            fit_to_content_checkbox=fit_to_content_checkbox,
            inline_label_checkbox=inline_label_checkbox,
            load_save_widget=load_save_widget,
            modify_button=modify_button
        )
    )
    return


@app.cell
def _(aw, wi):
    tabs = aw(
        wi.Tabs(
            [
                "Basic",
                "Map",
                "Accordion",
                "Projects",
                "Task",
                "Table",
                "Markdown",
                "Chat",
                "Tree",
                "HTML Template",
                "LoadSave"
            ]
        )
    )
    return (tabs,)


@app.cell
def _(mo):
    value, set_value = mo.state(0)
    return set_value, value


@app.cell
def _(aw, check_box, counter, selection_widget, slider, string_input, wi):
    layout_adjustable_widgets = [counter, selection_widget, string_input, slider, check_box, slider]

    def on_fit_to_content_change(value):
        for widget in layout_adjustable_widgets:
            widget.fit_to_content = value

    fit_to_content_checkbox = aw(wi.CheckBox(label="Fit to content", on_change=on_fit_to_content_change))

    def on_inline_labvel_change(value):
        for widget in layout_adjustable_widgets:
            widget.label_inline = value

    inline_label_checkbox = aw(wi.CheckBox(label="Inline Label", on_change=on_inline_labvel_change))
    return (
        fit_to_content_checkbox,
        inline_label_checkbox,
        layout_adjustable_widgets,
        on_fit_to_content_change,
        on_inline_labvel_change,
    )


@app.cell
def _():
    return


@app.cell
def _(aw, value, wi):
    counter = aw(
        wi.Number(
            default=value(),
            label="Counter:",
            fit_to_content=False,
            tooltip="This is the value the counter has reached.",
            unit="MW",
            strict_validation=True
        )
    )
    return (counter,)


@app.cell
def _(aw, set_value, value, wi):
    def on_click(event):
        set_value(value() + 1)

    increment_counter = aw(wi.Button(label="Increment Counter", on_click=on_click))
    return increment_counter, on_click


@app.cell
def _(aw, wi):
    selection_widget = aw(
        wi.DropDown(["1", "2", "3"], label="Select Value", fit_to_content=True)
    )
    return (selection_widget,)


@app.cell
def _(aw, wi):
    def on_validation(value):
        if value == value.lower():
            return True

        return "All characters must be lower case!"

    string_input = aw(
        wi.String(
            label="Enter text",
            tooltip="Type your text here",
            default="Hello",
            placeholder="Type something...",
            fit_to_content=False,
            label_inline=False,
            on_validation=on_validation,
            is_password=False,
        )
    )
    return on_validation, string_input


@app.cell
def _(aw, wi):
    map = aw(
        wi.MapSelector(
            points={
                "New York": [-73.985428, 40.748817],  # New York
                "Paris": [2.294481, 48.858370],  # Paris
                "Tokyo": [139.839478, 35.652832],  # Tokyo
            },
            center=[2.294481, 48.858370],
            zoom=0,
        )
    )
    return (map,)


@app.cell
def _(aw, wi):
    sub_process_task = wi.task.SubprocessTask(run_in_process=True)

    def on_start():
        print("Starting")
        sub_process_task.start(["echo 0%", "echo 100%"], shell=True)

    task_button = aw(wi.task.process_task_control(sub_process_task, on_start=on_start))
    return on_start, sub_process_task, task_button


@app.cell
def _(aw, wi):
    project_widget = aw(wi.ProjectsMenu())
    return (project_widget,)


@app.cell
def _(aw, project_widget, wi):
    def on_change_something(event):
        project_widget.changed = True

    make_a_change = aw(wi.Button(label="Make a change!", on_click=on_change_something))
    return make_a_change, on_change_something


@app.cell
def _(aw, wi):
    # Create a single accordion button
    accordion = aw(
        wi.Accordion(
            title="Click to expand",
            expanded=False,  # Optional: specify initial state
        )
    )
    return (accordion,)


@app.cell
def _(aw, wi):
    toggle_button = aw(
        wi.ToggleButton(label="Toogle Something")
    )
    return (toggle_button,)


@app.cell
def _(aw, wi):
    check_box = aw(
        wi.CheckBox(label="Check Something")
    )
    return (check_box,)


@app.cell
def _(aw, wi):
    radio = aw(
        wi.RadioButtons(
            options=["Option 1", "Option 2", "Option 3"],
            label="Select an option",
            tooltip="Choose one of the available options",
            default="Option 1",
        )
    )
    return (radio,)


@app.cell
def _(aw, wi):
    slider = aw(
        wi.Slider(
            label="Select a value",
            min_value=0,
            max_value=100,
            step=1,
            default=50,
            tooltip="Drag to adjust the value",
            label_inline=False,
            fit_to_content=False
        )
    )
    return (slider,)


@app.cell
def _(aw, wi):
    from datetime import datetime, timedelta

    # Create a datetime picker with a date range
    now = datetime.now()
    picker = aw(
        wi.DateTimePicker(
            label="Select date and time",
            tooltip="Choose a date and time",
            default=now,
            min_date=now - timedelta(days=7),  # Last week
            max_date=now + timedelta(days=7),  # Next week
        )
    )
    return datetime, now, picker, timedelta


@app.cell
def _(aw, datetime, timedelta, wi):
    # Create a datetime range picker with a date range
    _now = datetime.now()
    picker_range = aw(
        wi.DateTimeRangePicker(
            label="Select date and time range",
            tooltip="Choose start and end dates/times",
            default_start=_now,
            default_end=_now + timedelta(hours=2),
            min_date=_now - timedelta(days=7),  # Last week
            max_date=_now + timedelta(days=7),  # Next week
        )
    )
    return (picker_range,)


@app.cell
def _(aw, wi):
    # Create a markdown display with some content
    md = aw(
        wi.MarkdownDisplay(
            """
    # Hello World

    This is a **markdown** display widget with support for:

    - Lists
    - *Italic* and **bold** text
    - `code blocks`
    - [Links](https://example.com)
    - Math equations: $E = mc^2$
    - Tables
    - And more!"""
        )
    )
    return (md,)


@app.cell
def _(aw, wi):
    # Create sample data
    data = [
        {"name": "John", "age": 30, "city": "New York"},
        {"name": "Jane", "age": 25, "city": "London"},
        {"name": "Bob", "age": 35, "city": "Paris"},
    ]

    # Define columns
    columns = [
        {"accessorKey": "name", "header": "Name"},
        {"accessorKey": "age", "header": "Age"},
        {"accessorKey": "city", "header": "City"},
    ]

    # Create table widget
    table = aw(wi.Table(data=data, columns=columns, page_size=10))

    # Get selected rows
    selected_data = table.get_selected_rows()

    # Update data
    new_data = [{"name": "Alice", "age": 28, "city": "Tokyo"}]
    table.update_data(new_data)
    return columns, data, new_data, selected_data, table


@app.cell
def _(aw, wi):
    # Create chat widget
    chat = aw(
        wi.Chat(
            messages=[
                {"content": "Hello! How can I help you today?", "type": "system"}
            ],
            placeholder="Type your message here...",
        )
    )

    # Handle new messages
    def on_new_message(change):
        if change.new is not None:
            # Echo back the message
            chat.add_message(f"You said: {change.new['content']}", msg_type="user")

    chat.observe_new_messages(on_new_message)

    # Add a new system message
    chat.add_message("This is a system message", msg_type="system")
    return chat, on_new_message


@app.cell
def _(aw, wi):
    items = {
        'root': {
            'id': 'root',  # Add id field
            'label': 'Root',
            'parent_id': None,
            'is_expanded': True  # Add is_expanded field
        },
        'branch1': {
            'id': 'branch1',
            'label': 'Branch 1',
            'parent_id': 'root',
            'is_expanded': True
        },
        'leaf1': {
            'id': 'leaf1',
            'label': 'Leaf 1',
            'parent_id': 'branch1',
            'is_expanded': False
        },
        'leaf2': {
            'id': 'leaf2',
            'label': 'Leaf 2',
            'parent_id': 'branch1',
            'is_expanded': False
        },
        'branch3': {
            'id': 'branch3',
            'label': 'Branch 3',
            'parent_id': 'root',
            'is_expanded': True
        },
    }

    tree = aw(wi.TreeBrowser(
        items=items,
        selection_mode='single',
        expanded_ids=['root', 'branch1']
    ))
    return items, tree


@app.cell
def _(aw, wi):
    # Create a template with variables
    template = """
    <div>
        <h1>Welcome, {{name}}!</h1>
        <p>Your age is {{age}} years old.</p>
        <p>Your favorite color is {{color}}.</p>
    </div>
    """

    # Define variables
    variables = {
        "name": "John Doe",
        "age": 32,
        "color": "blue"
    }

    # Create the widget
    widget_html = aw(wi.HTMLTemplate(template=template, variables=variables))
    return template, variables, widget_html


@app.cell
def _(widget_html):
    widget_html.update_variable("age", 50)
    return


@app.cell
def _(chat):
    chat.set_thinking("system", True)
    return


if __name__ == "__main__":
    app.run()
