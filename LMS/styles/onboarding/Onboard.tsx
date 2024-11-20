import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    firstContainer: {
        alignItems: "center",
        marginTop:50
    },
    logo: {
        width: wp("23%"),
        height: hp("10%")
    },
    titleWrapper: {
        flexDirection: "row"
    },
    titleTextShape1: {
        position: "absolute",
        left: -28,
        right: -28
    },
    titleText: {
        fontSize: hp("4%"),
        textAlign: "center"
    },
    titleShape3: {
        position: "absolute",
        left: 60
    },
    dscWrapper: {
        marginTop: 30
    },
    dscpText: {
        textAlign: "center",
        color: "#575757",
        fontSize: hp("2%")
    },
    buttonWrapper:{
        backgroundColor: "#2467EC",
        width: wp("92%"),
        paddingVertical: 18,
        borderRadius: 4,
        marginTop: 40
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }

})