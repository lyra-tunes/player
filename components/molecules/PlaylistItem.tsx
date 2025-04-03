import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type PlaylistItemProps = {
    name: string;
    songCount: number;
    isHighlighted?: boolean;
    image?: string | null; // Optional album image
};

const PlaylistItem: React.FC<PlaylistItemProps> = ({ name, songCount, isHighlighted, image }) => {
    return (
        <View style={[styles.container, isHighlighted && styles.highlightedBackground]}>
            {image ? (
                <Image source={{ uri: image }} style={[styles.albumImage]} />
            ) : (
                <View style={[styles.iconContainer, isHighlighted && styles.highlightedImageBackground]}>
                    <MaterialIcons name="music-note" size={24} color="#bbb" />
                </View>
            )}
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.count}>{songCount} songs</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    highlightedBackground: {
        backgroundColor: "#1f293780"
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#ffffff66",
        marginRight: 10,
    },
    albumImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    highlightedImageBackground: {
        backgroundColor: "#6B21A8", // Purple background when no image
    },
    highlightedBorder: {
        borderWidth: 2,
        borderColor: "#6B21A8", // Purple border when image exists
    },
    name: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    count: {
        color: "#bbb",
        fontSize: 12,
    },
});

export default PlaylistItem;
