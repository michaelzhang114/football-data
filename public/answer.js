const answerIdCandidates = [
	498532, 360918, 604785, 1279764, 80562, 935379, 167008, 239219, 776151,
	827315, 967622, 956682, 422685, 710159, 208494, 974618, 493647, 950561,
	1137668, 963983, 674014, 484878, 363333, 524437, 844425, 1203661, 748382,
	806552, 860975, 1207581, 873014, 282775, 769166, 1076756, 933576, 793907,
	243138, 942368, 783505, 822237, 867414, 933845, 956683, 923312, 113836,
	416175, 1054122, 97194, 1258092, 1113670, 1098780, 951954, 189103, 1352713,
	1079485, 997560, 1200631, 1073402, 751066, 955376, 737066, 792645, 862993,
	1356310, 556972, 1098752, 961306, 469804, 1107280, 683402, 609755, 704523,
	794253, 942381, 881500, 775614, 860920, 1002039, 535936, 171698, 711357,
	729731, 442277, 662936, 169756, 536457, 959407, 1348595, 963812, 1077975,
	209405, 185349, 917802, 802245, 955529, 434325, 1107910, 1195281, 318615,
	1107620, 671331, 818893, 268212, 157838, 891855, 716687, 1199272, 982692,
	148302, 862608, 1052898, 654908, 246575, 978680, 963964, 789571, 304455,
	674009, 182962, 113772, 212867, 307317, 1047671, 719219, 865131, 687008,
	671529, 889534, 765693, 49543, 30973, 816325, 1368318, 750032, 303346,
	493165, 1089691, 955406, 295060, 356406, 591734, 959247, 690107, 888912,
	822716, 239920, 795539, 570461, 793820, 820140, 176186, 259301, 532220,
	1070712, 883075, 623621, 215168, 258269, 502420, 729506, 844477, 877401,
	319784, 982620, 614006, 552718, 466672, 610184, 894805, 424129, 576165,
	1035202, 976506, 1069536, 1190867, 1096400, 1308370, 800520, 1010426,
	1021929, 287894, 818975, 198444, 650616, 891743, 782502, 675088, 1227012,
	696443, 295067, 562727, 850354, 861447, 266523, 688273, 540088, 1086012,
	766435, 540963, 77690, 863098, 746395, 866967, 191869, 760359, 107917,
	1086647, 1324871, 292462, 413557, 266520, 797908, 1253827, 1099974, 1067168,
	109491, 357880, 419664, 916332, 620618, 1137705, 155782, 1067256, 157723,
	1187213, 773991, 494597, 37234, 1097466, 905498, 521318, 820581, 246331,
	696646, 611491, 1372921, 1112684, 230982, 1086939, 620026, 172949, 184321,
	450980, 339992, 129915, 626667, 417068, 731855, 923498, 109897, 276729,
	1021382, 312765, 1226789, 974753, 1250253, 210111, 906937, 263653, 956169,
	1128945, 683450, 179410, 471274, 401932, 496563, 950474, 439369, 612150,
	523825, 1107648, 789502, 846369, 72241, 470834, 1013277, 843040, 789578,
	1078788, 1088066, 630953, 1084981, 279489, 724306, 1083796, 289137, 672469,
	308932, 23354, 873237, 795371, 789630, 292313, 369761, 1192854, 1113690,
	820024, 789066, 146830, 1131987, 966027, 785411, 787350, 749736, 403049,
	169200, 465750, 1025462, 426880, 259306, 202643, 860914, 214570, 1197250,
	1021834, 465960, 803343, 846383, 201690, 94086, 240538, 807729, 831489,
	1068902, 1185748, 425255, 957118, 775355, 940442, 201664, 477588, 847983,
	682548, 664444, 901495, 255610, 841150, 240054, 488412, 212944, 592102,
	195668, 352887, 848034, 488139, 914132, 617310, 538112, 846005, 1197655,
	942549, 729988, 304355, 751550, 662428, 363364, 1197347, 189982, 469701,
	330643, 1030829,
];

export function getAnswerIdFromPuzzleNumber(index) {
	// return 1197655;
	return answerIdCandidates[index];
}

// TODO - set up environment vars for this maybe
const daysInterval = 1000 * 60 * 60 * 24;
const minInterval = 1000 * 60 * 1;

export function getCurrentIndex() {
	// Set the target date (January is 0-based month in JavaScript)
	const targetDate = new Date(2024, 0, 28, 0, 0, 0);

	// Get the current date
	const currentDate = new Date();

	// Calculate the time difference in milliseconds
	const timeDifference = currentDate - targetDate;

	// const interval = Math.floor(timeDifference / minInterval);
	const interval = Math.floor(timeDifference / daysInterval);

	const resultInRange = (interval % answerIdCandidates.length) + 1;

	return resultInRange;
}
