"use client";
import { SensorData } from "@/constant/model";
import { format } from "date-fns";
import {
    Clock,
    Cloud,
    Thermometer,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


const Chart = ({ isExport }) => {

    // THEME-BASED COLORS
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const [ht, setHeight] = useState(200);
    const primary = "#3dcd58";
    const secondary = "#3a80f6";


    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerWidth < 768 ? 200 : 600);
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    // CUSTOM HOVER
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div
                    style={{ width: 250 }}
                    className="p-3 rounded-xl shadow-xl border border-border  bg-card/60 backdrop-blur-xl text-[9px] sm:text-xs"
                >
                    <div className="flex gap-2 font-bold h-5 text-text ">
                        <Clock className="size-4  " />
                        <span>TimeStamp: {format(data.timestamp, "dd MMM yy hh:mm:ss a")}</span>
                    </div>

                    <div className="flex gap-2 font-bold h-5 text-primary ">
                        <Thermometer className="size-4  " />
                        <span>AvgTemp: {data.avgTemp} °C</span>
                    </div>
                    <div className="flex gap-2 font-bold h-5 text-secondary ">
                        <Cloud className="size-4 " />
                        <span>RH: {data.rh}%</span>
                    </div>

                </div>
            );
        }
        return null;
    };

    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex gap-4 justify-center items-center mt-4">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <svg width="20" height="12">
                            {/* line */}
                            <line
                                x1="0"
                                y1="6"
                                x2="20"
                                y2="6"
                                stroke={entry.color}
                                strokeWidth="3"
                                strokeLinecap="round"
                            />

                            {/* center dot */}
                            <circle
                                cx="10"
                                cy="6"
                                r="3"
                                fill={entry.color}
                                stroke={entry.color}
                            />
                        </svg>
                        <span className="uppercase" style={{ color: entry.color }}>{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    const width = isExport ? 1920 : undefined;
    const height = isExport ? 720 : 400;
    const fontSize = isExport ? 21 : 12;
    const ChartBody = (
        <LineChart
            width={isExport ? width : undefined}
            height={isExport ? height : undefined}
            data={SensorData}
            style={{
                backgroundColor: isExport ? "#FFFFFF" : undefined,
                border: isExport ? "#f1f3f4" : undefined,
                borderWidth: isExport ? 1 : undefined,
            }}
        >
            <CartesianGrid
                stroke={isExport ? "#f1f3f4" : isDark ? "#ffffff1a" : "#03030314"}
                vertical={false}
            />

            <XAxis
                dataKey="timestamp"
                tickCount={10}
                tick={{
                    fontSize: fontSize,
                    className: "text-text fill-current ",
                    angle: -45,
                    textAnchor: "end",
                }}
                height={isExport ? 140 : 80}
                // tickFormatter={(value) => formatDateTime(value, "dd | hh:mm a")}
                label={{
                    value: "TimeStamp",
                    position: "insideBottom",
                    style: { fontSize: fontSize, textAnchor: "middle", fontWeight: "bold" },
                    className: "fill-current",
                }}
            />

            <YAxis
                yAxisId="left"
                tick={{ fontSize: fontSize, className: "fill-current" }}
                label={{
                    value: "Temperature (°C)",
                    angle: -90,
                    dx: 10,
                    position: "insideLeft",
                    className: "fill-current",
                    style: { fontSize: fontSize, textAnchor: "middle", fontWeight: "bold" },
                }}
            />
            <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: fontSize, className: "fill-current" }}
                label={{
                    value: "Relative Humidity (%)",
                    angle: 90,
                    dx: -10,
                    position: "insideRight",
                    className: "fill-current",
                    style: { fontSize: fontSize, textAnchor: "middle", fontWeight: "bold" },
                }}
            />

            {isExport ? null : (
                <Tooltip
                    content={CustomTooltip}
                    position={
                        isMobile
                            ? {
                                x: window.innerWidth / 2 - 180,
                                y: window.innerHeight / 2 - 200,
                            }
                            : undefined
                    }
                    wrapperStyle={
                        isMobile
                            ? {
                                position: "fixed",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 9999,
                                pointerEvents: "none",
                            }
                            : {}
                    }
                />
            )}

            <Legend
                content={CustomLegend}
                verticalAlign="top"
                align="center"
                wrapperStyle={{ fontSize: fontSize }}
            />

            <Line
                type="monotone"
                dataKey="avgTemp"
                yAxisId="left"
                stroke={primary}
                strokeWidth={2}
                dot={false}
            />
            <Line
                type="monotone"
                dataKey="rh"
                yAxisId="right"
                stroke={secondary}
                strokeWidth={2}
                dot={false}
            />
        </LineChart>
    );

    return (
        <div className="glass-card">
            {isExport ? (
                ChartBody
            ) : (
                <ResponsiveContainer width="100%" height={ht}>
                    {ChartBody}
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Chart;