import { StyleSheet } from "@react-pdf/renderer";
import { THEME } from "./theme";


export const styles = StyleSheet.create({
    page: {
        backgroundColor: THEME.bg,
        padding: 25,
        fontSize: 8,
        fontFamily: "Helvetica",
        color: THEME.txt,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${THEME.border}`,
        paddingBottom: 8,
        marginBottom: 10,
    },
    icon: {
        height: 40,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        color: THEME.main,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    chartContainer: {
        width: "100%",
        border: `1px solid ${THEME.border}`,
        overflow: "hidden",
    },

    chartImg: {
        width: "100%",
        objectFit: "contain",
    },

    //  Table

    tableContainer: {
        width: "100%",
        marginTop: 2,
        border: `1px solid ${THEME.border}`,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: THEME.main,
        paddingVertical: 8,
    },
    tableHeaderText: {
        display: "flex",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        backgroundColor: THEME.evenbg,
        paddingVertical: 8,
    },
    tableCell: {
        display: "flex",
        textAlign: "center",
    },

    // Header Box

    gridContainer: {
        backgroundColor: THEME.card,
        borderRadius: 3,
        padding: 8,
        border: `1px solid ${THEME.border}`,
    },
    gridRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 2,
        gap: 2,
    },
    label: {
        fontWeight: "bold",
    },

    // ACC BOX
    section: {
        backgroundColor: THEME.bg,
    },

    batchHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: THEME.main,
        fontWeight: "bold",
        color: "#fff",
        border: `1px solid ${THEME.border}`,
    },
    matHeader: {
        backgroundColor: THEME.main,
        color: "#fff",
        paddingVertical: 4,
        paddingHorizontal: 6,
        fontWeight: "bold",
    },
    accContainer: {
        marginBottom: 8,
        border: `1px solid ${THEME.border}`,
    },
    accHeader: {
        flexDirection: "row",
        backgroundColor: THEME.accent,
        paddingVertical: 4,
    },
    accHeaderText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    accRow: {
        flexDirection: "row",
        paddingVertical: 4,
    },
    accCell: {
        flex: 1,
        textAlign: "center",
    },
    totalLabel: {
        textAlign: "center",
        backgroundColor: THEME.accent,
        fontWeight: "bold",
        paddingVertical: 4,
        marginVertical: 2,
    },
    totalRow: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 4,
    },
});