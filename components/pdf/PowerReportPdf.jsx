"use client"
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { styles } from "./style";
import { THEME } from "./theme";
import { room } from "@/constant/model";


const ITEM_PER_PAGE = 20;
const columns = ["DATE", "TIME", "POWER (KW)"];
const columnWidths = [1, 1, 1];
const PowerReport = ({ data, roomName, chartImg, category }) => {
    const pages = [];
    let start = 0;
    // First Page : 10 Item
    pages.push(data.slice(start, 10));
    // 15 Item Per Page
    for (let start = 10; start < data.length; start += ITEM_PER_PAGE) {
        pages.push(data.slice(start, start + ITEM_PER_PAGE));
    }
    return (
        <Document>
            {pages.map((pageRows, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    {/* --- Header --- */}
                    <View style={styles.header}>
                        <Image src="/logo.png" style={styles.icon} />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: 6,
                            }}
                        >
                            <Text style={{ fontSize: 10, color: "#555" }}>
                                {format(new Date(), "dd MMMM yyyy")}
                            </Text>
                            <Text style={{ fontSize: 10, color: "#555" }}>
                                {format(new Date(), "hh:mm:ss a")}
                            </Text>
                        </View>
                    </View>

                    {/* Title On First Page */}
                    {pageIndex === 0 && (
                        <View style={{ marginBottom: 6 }}>
                            <Text style={styles.title}>{room[category] ?? "Room"}</Text>
                            {/* Batch Info */}
                            <View style={styles.gridRow}>
                                <Text style={styles.label}>Room Name:</Text>
                                <Text>{roomName}</Text>
                            </View>
                            {/* <View style={styles.gridRow}>
                                <Text style={styles.label}>Duration:</Text>
                                <Text>
                                    {format(date.from, "dd-MMM-yyyy")} -{" "}
                                    {format(date.to, "dd-MMM-yyyy")}
                                </Text>
                            </View> */}
                        </View>
                    )}

                    Chart
                    {pageIndex === 0 && (
                        <View
                            style={{
                                display: "flex",
                                gap: 2,
                                flexDirection: "column",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{ color: THEME.main, fontWeight: "bold", fontSize: 12 }}
                            >
                                Overview
                            </Text>
                            <View style={styles.chartContainer}>
                                <Image src={chartImg} style={styles.chartImg} />
                            </View>
                            <Text
                                style={{
                                    color: THEME.main,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginTop: 10,
                                }}
                            >
                                Detail
                            </Text>
                        </View>
                    )}

                    {/* --- Table --- */}
                    <View style={styles.tableContainer}>
                        {/* Header */}
                        <View style={styles.tableHeader}>
                            {columns.map((col, i) => (
                                <Text
                                    key={i}
                                    style={[styles.tableHeaderText, { flex: columnWidths[i] }]}
                                >
                                    {col}
                                </Text>
                            ))}
                        </View>

                        {/* Rows */}
                        {pageRows?.map((item, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.tableRow,
                                    i % 2 === 0 && { backgroundColor: THEME.card },
                                ]}
                            >
                                <Text style={[styles.tableCell, { flex: columnWidths[0] }]}>
                                    {format(item.timestamp, "dd MMM yyyy")}
                                </Text>
                                <Text style={[styles.tableCell, { flex: columnWidths[1] }]}>
                                    {format(item.timestamp, "hh:mm:ss a")}
                                </Text>

                                <Text style={[styles.tableCell, { flex: columnWidths[2] }]}>
                                    {item.kw}
                                </Text>
                            </View>
                        ))}
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default PowerReport;