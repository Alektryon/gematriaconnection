var catArr = []; gemArr = []
var cipherArray = [];
var openCiphers = ["English Ordinal", "Full Reduction", "Reverse Ordinal", "Reverse Full Reduction"]
var ciphersOn = []; allCiphers = []; sHistory = []
var opt_NumCalculation = "Reduced"
var primeArr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 
103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251]
var ignoreArr = [1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473]

function Gem_Launch() {
	Set_Categories()
	Build_Ciphers()
	//Load_Options(false)
}

class cipher {
	constructor(impName, impOrder, impR, impG, impB, impMod1 = "", impMod2 = "", impMod3 = "", impMod4 = "", impMod5 = "") {
		var x, y, xMod
		var impMods = []
		
		this.cArr = []; this.cArr2 = []; this.cArr3 = []; this.cArr4
		
		this.vArr = []; this.vArr2 = []; this.vArr3 = []; this.vArr4
		this.Nickname = impName; this.cp = []; this.cv = []; this.sumArr = []; this.RGB = []
		impMods[0] = impMod1
		impMods[1] = impMod2
		impMods[2] = impMod3
		impMods[3] = impMod4
		impMods[4] = impMod5
		this.RGB = [impR, impG, impB]

		switch (impOrder) {
			case "English":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				Build_GemVals(this)
				break;

			


				
			case "Jewish":
				this.cArr = [97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 121, 122, 106, 118, 38, 119]
				this.cArr2 = [65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 88, 89, 90, 74, 86, 38, 87]
				Build_GemVals(this)
				break;
	
			case "Hebrew G":
				this.cArr = [1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1499, 1500, 1502, 1504, 1505, 1506, 1508, 1510, 1511, 1512, 1513, 1514, 1498, 1501, 1503, 1507, 1509]
				for (y = 0; y < 22; y++) {
					this.vArr.push(y + 1)
				}
				this.vArr[22] = 11; this.vArr[23] = 13; this.vArr[24] = 14; this.vArr[25] = 17; this.vArr[26] = 18
				break;
				
				case "Arabic":
				this.cArr = [1575, 1576, 1580, 1583, 1607, 1608, 1586, 1581, 1591, 1610, 1603, 1604, 1605, 1606, 1587, 1593, 1601, 1589, 1602, 1585, 1588, 1578, 1579, 1582, 1584, 1590, 1592, 1594]
				for (y = 0; y < 28; y++) {
					this.vArr.push(y + 1)
				}
				break;
				
			case "Hebrew Soffits":
				this.cArr = [1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1499, 1500, 1502, 1504, 1505, 1506, 1508, 1510, 1511, 1512, 1513, 1514, 1498, 1501, 1503, 1507, 1509]
				Build_GemVals(this)
				break;
			case "Greek":
				this.cArr = [913, 914, 915, 916, 917, 988, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 984, 929, 931, 932, 933, 934, 935, 936, 937, 993]
				this.cArr2 = [945, 946, 947, 948, 949, 989, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 985, 961, 963, 964, 965, 966, 967, 968, 969, 993]
				this.cArr3 = [940, 941, 942, 943, 962, 972, 973, 974, 986, 987, 902, 904, 905, 906, 908, 910, 911, 7952, 8000, 8150, 8058, 8166]
				this.vArr3 = [1, 5, 8, 10, 20, 16, 22, 26, 6, 6, 1, 5, 7, 10, 16, 22, 26, 5, 16, 9, 22, 22]
				Build_GemVals(this)
				break;
			case "Chald":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 5, 8, 3, 5, 1, 1, 2, 3, 4, 5, 7, 8, 1, 2, 3, 4, 6, 6, 6, 5, 1, 7]
				this.vArr2 = [1, 2, 3, 4, 5, 8, 3, 5, 1, 1, 2, 3, 4, 5, 7, 8, 1, 2, 3, 4, 6, 6, 6, 5, 1, 7]
				break;
			case "Keypad":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9]
				this.vArr2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9]
				break;
				
				case "Fibonacci":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
		        this.vArr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025,121393]
				this.vArr2 = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025,121393]
				break;
				
				case "Fibonacci Reduced":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
		        this.vArr = [1, 1, 2, 3, 5, 8, 4, 3, 7, 10, 8, 9, 1, 1, 2, 3, 5, 8, 4, 3, 7, 10, 8, 9, 1, 1]
				this.vArr2 = [ 1, 1, 2, 3, 5, 8, 4, 3, 7, 10, 8, 9, 1, 1, 2, 3, 5, 8, 4, 3, 7, 10, 8, 9, 1, 1]
				break;
				
				
				case "Barnis Cipher":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 233, 144, 89, 55, 34, 21, 13,  8, 5, 3, 2, 1, 1]
				this.vArr2 = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 233, 144, 89, 55, 34, 21, 13,  8, 5, 3, 2, 1, 1]
				break;
				
				case "NonPrime":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38]
				this.vArr2 = [ 1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38]
				break;
				
				case "Pentagonal":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 5, 12, 22, 35, 51, 70, 92, 117, 145, 176, 210, 247, 287, 330, 376, 425, 477, 532, 590, 651, 715, 782, 852, 925, 1001]
				this.vArr2 = [1, 5, 12, 22, 35, 51, 70, 92, 117, 145, 176, 210, 247, 287, 330, 376, 425, 477, 532, 590, 651, 715, 782, 852, 925, 1001]
				break;
				
				case "Tesla":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6]
				this.vArr2 = [3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6, 9, 3, 6]
				break;
				
				case "Inversed":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1,2,3,4,5,6,7,8, 9,1,11,21,31, 41, 51,61,71,81,91,2,12,22,32,42,52,62]
				this.vArr2 = [1,2,3,4,5,6,7,8, 9,1,11,21,31, 41, 51,61,71,81,91,2,12,22,32,42,52,62]
				break;
		
				 case "Polish Ordinal":
				for (y = 0; y < 35; y++) {
				this.cArr = [65,260,66,67,262,68,69,280,70,71,72,73,74,75,76,321,77,78,323,79,211,80,81,82,83,346,84,85,86,87,88,89,90,377,379]
				this.cArr2 = [97,261,98,99,263,100,101,281,102,103,104,105,106,107,108,322,109,110,324,212,111,112,113,114,115,347,116,117,118,119,120,121,122,378,380]
				this.vArr = [1, 1, 2,3,3, 4, 5, 5, 6,7, 8, 9, 10, 11, 12, 12, 13, 14, 14, 15, 15, 16, 17, 18, 19, 19, 20, 21,22,23,24,25, 26, 26, 26]
				this.vArr2 = [1, 1, 2,3,3, 4, 5, 5, 6,7, 8, 9, 10, 11, 12, 12, 13, 14, 14, 15, 15, 16, 17, 18, 19, 19, 20, 21,22,23,24,25, 26, 26, 26]
				}
				break;
				
				 case "Polish Nous":
				for (y = 0; y < 35; y++) {
				this.cArr = [65,260,66,67,262,68,69,280,70,71,72,73,74,75,76,321,77,78,323,79,211,80,81,82,83,346,84,85,86,87,88,89,90,377,379]
				this.cArr2 = [97,261,98,99,263,100,101,281,102,103,104,105,106,107,108,322,109,110,324,212,111,112,113,114,115,347,116,117,118,119,120,121,122,378,380]
				this.vArr = [100, 100, 101,102,102, 103, 104,104, 105, 106,107, 108, 109, 110, 111,111, 112, 113, 113,114, 114,115,116, 117,118, 118, 119,  120, 121,122,123,124,125, 125,125]
				this.vArr2 = [100, 100, 101,102,102, 103, 104,104, 105, 106,107, 108, 109, 110, 111,111, 112, 113, 113,114, 114,115,116, 117,118, 118, 119,  120, 121,122,123,124,125, 125,125]
				}
				break;
				
					 case "Reverse Polish Ordinal":
				for (y = 0; y < 35; y++) {
				this.cArr = [65,260,66,67,262,68,69,280,70,71,72,73,74,75,76,321,77,78,323,79,211,80,81,82,83,346,84,85,86,87,88,89,90,377,379]
				this.cArr2 = [97,261,98,99,263,100,101,281,102,103,104,105,106,107,108,322,109,110,324,212,111,112,113,114,115,347,116,117,118,119,120,121,122,378,380]
				this.vArr = [26,26,25,24,24,23,22,22,21,20,19,18,17,16,15,15,14,13,13,12,12,11,10,9,8,8,7,6,5,4,3,2,1,1,1]
				this.vArr2 = [26,26,25,24,24,23,22,22,21,20,19,18,17,16,15,15,14,13,13,12,12,11,10,9,8,8,7,6,5,4,3,2,1,1,1]
				}
				break;
				
				 case "Reverse Polish Nous":
				for (y = 0; y < 35; y++) {
				this.cArr = [65,260,66,67,262,68,69,280,70,71,72,73,74,75,76,321,77,78,323,79,211,80,81,82,83,346,84,85,86,87,88,89,90,377,379]
				this.cArr2 = [97,261,98,99,263,100,101,281,102,103,104,105,106,107,108,322,109,110,324,212,111,112,113,114,115,347,116,117,118,119,120,121,122,378,380]
				this.vArr = [100, 100, 101,102,102, 103, 104,104, 105, 106,107, 108, 109, 110, 111,111, 112, 113, 113,114, 114,115,116, 117,118, 118, 119,  120, 121,122,123,124,125, 125,125]
				this.vArr2 = [100, 100, 101,102,102, 103, 104,104, 105, 106,107, 108, 109, 110, 111,111, 112, 113, 113,114, 114,115,116, 117,118, 118, 119, 120, 121,122,123,124,125, 125,125]
				}
				break;
				
				
				case "Deficient number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25, 26, 27, 29, 31, 32, 33]
				this.vArr2 = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25, 26, 27, 29, 31, 32, 33]
				break;
				
				case "Lucky number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 3, 7, 9, 13, 15, 21, 25, 31, 33, 37, 43, 49, 51, 63, 67, 69, 73, 75, 79, 87, 93, 99, 105, 111, 115]
				this.vArr2 = [1, 3, 7, 9, 13, 15, 21, 25, 31, 33, 37, 43, 49, 51, 63, 67, 69, 73, 75, 79, 87, 93, 99, 105, 111, 115]
				break;
				
				case "Padovan sequence":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28, 37, 49, 65, 86, 114, 151, 200, 265, 351, 465, 616, 816]
				this.vArr2 = [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28, 37, 49, 65, 86, 114, 151, 200, 265, 351, 465, 616, 816]
				break;
				
				case "Happy number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100, 103, 109, 129, 130, 133, 139]
				this.vArr2 = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100, 103, 109, 129, 130, 133, 139]
				break;
				
				case "Semiprime":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [4, 6, 9, 10, 14, 15, 21, 22, 25, 26, 33, 34, 35, 38, 39, 46, 49, 51, 55, 57, 58, 62, 65, 69, 74, 77]
				this.vArr2 = [4, 6, 9, 10, 14, 15, 21, 22, 25, 26, 33, 34, 35, 38, 39, 46, 49, 51, 55, 57, 58, 62, 65, 69, 74, 77]
				break;
								
				case "Untouchable number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [2, 5, 52, 88, 96, 120, 124, 146, 162, 188, 206, 210, 216, 238, 246, 248, 262, 268, 276, 288, 290, 292, 304, 306, 322, 324]
				this.vArr2 = [2, 5, 52, 88, 96, 120, 124, 146, 162, 188, 206, 210, 216, 238, 246, 248, 262, 268, 276, 288, 290, 292, 304, 306, 322, 324]
				break;
				
				case "Smith number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [4, 22, 27, 58, 85, 94, 121, 166, 202, 265, 274, 319, 346, 355, 378, 382, 391, 438, 454, 483, 517, 526, 535, 562, 576, 588]
				this.vArr2 = [4, 22, 27, 58, 85, 94, 121, 166, 202, 265, 274, 319, 346, 355, 378, 382, 391, 438, 454, 483, 517, 526, 535, 562, 576, 588]
				break;
				
				case "Palindromic number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99, 101, 111, 121, 131, 141, 151, 161, 171]
				this.vArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99, 101, 111, 121, 131, 141, 151, 161, 171]
				break;
				
				case "Strictly non-palindromic number":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 6, 11, 19, 47, 53, 79, 103, 137, 139, 149, 163, 167, 179, 223, 263, 269, 283, 293, 311, 317, 347, 359]
				this.vArr2 = [1, 2, 3, 4, 6, 11, 19, 47, 53, 79, 103, 137, 139, 149, 163, 167, 179, 223, 263, 269, 283, 293, 311, 317, 347, 359]
				break;
				
				case "Magic Squares Up to 13th":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 5, 15, 34, 65, 111, 175, 260, 369, 505, 671, 870, 1105, 1105, 870, 671, 505, 369, 260, 175, 111, 65, 34, 15, 5, 1]
				this.vArr2 = [1, 5, 15, 34, 65, 111, 175, 260, 369, 505, 671, 870, 1105, 1105, 870, 671, 505, 369, 260, 175, 111, 65, 34, 15, 5, 1]
				break
				
				case "Magic Squares Up to 7th":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 5, 15, 34, 65, 111, 175, 111, 65, 34, 15, 5, 1, 1, 5, 15, 34, 65, 111, 175, 111, 65, 34, 15, 5, 1]
				this.vArr2 = [1, 5, 15, 34, 65, 111, 175, 111, 65, 34, 15, 5, 1, 1, 5, 15, 34, 65, 111, 175, 111, 65, 34, 15, 5, 1]
				break
				
				
				
				
				case "Qwerty":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [11, 24, 22, 13, 3, 14, 15, 16, 8, 17, 18, 19, 26, 25, 9, 10, 1, 4, 12, 5, 7, 23, 2, 21, 6, 20]
				this.vArr2 = [11, 24, 22, 13, 3, 14, 15, 16, 8, 17, 18, 19, 26, 25, 9, 10, 1, 4, 12, 5, 7, 23, 2, 21, 6, 20]
				break;
				
				case "Qwertz":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [11, 24, 22, 13, 3, 14, 15, 16, 8, 17, 18, 19, 26, 25, 9, 10, 1, 4, 12, 5, 7, 23, 2, 21, 20, 6]
				this.vArr2 = [11, 24, 22, 13, 3, 14, 15, 16, 8, 17, 18, 19, 26, 25, 9, 10, 1, 4, 12, 5, 7, 23, 2, 21, 20, 6]
				break;
				
				
				case "Azerty":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 25, 23,13,3,14,15,16,8,17,18,19,20,26,9,10,11,4,12,5,7,24,21,22,6,2]
				this.vArr2 = [1, 25, 23,13,3,14,15,16,8,17,18,19,20,26,9,10,11,4,12,5,7,24,21,22,6,2]
				break;
				
				
				case "Isisian Codes":
				for (y = 0; y < 25; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16, 1, 2, 3, 4, 5, 6, 7, 8, 9]
				this.vArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16, 1, 2, 3, 4, 5, 6, 7, 8, 9]
				break;
				
				case "English Ordinal Starting at 2":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
				this.vArr2 = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
				break;
				
                case "English Ordinal Starting at 3":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
				this.vArr2 = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
				break;
                
                case "English Ordinal Starting at 4":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
				this.vArr2 = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
				break;
                
                case "English Ordinal Starting at 5":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
				this.vArr2 = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
				break;
                
                case "English Ordinal Starting at 6":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
				this.vArr2 = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
				break;
                
                case "English Ordinal Starting at 7":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
				this.vArr2 = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
				break;
                
                case "English Ordinal Starting at 8":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
				this.vArr2 = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
				break;
                
                case "English Ordinal Starting at 9":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]
				this.vArr2 = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,,28,29,30,31,32,33,34]
				break;
                
                case "Alphanumeric Qabbala":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
				this.vArr2 = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
				break;
                
                case "Master":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
				this.vArr2 = [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
				break;
                
                case "Master Builder":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]
				this.vArr2 = [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]
				break;
                
                case "Masonic":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]
				this.vArr2 = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]
				break;
                
                case "Foundation":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]
				this.vArr2 = [44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]
				break;
                
                case "Archaic Latin":
				for (y = 0; y < 21; y++) {
				this.cArr = [97,98,99,100,101,102,122,104,105,107,108,109,110,111,112,113,114,115,116,118,120]
				this.cArr2 = [65,66,67,68,69,70,90,72,73,75,76,77,78,79,80,81,82,83,84,86,88]
				this.vArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
				this.vArr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
                }
				break;
                
                case "Etruscan":
				for (y = 0; y < 27; y++) {
				this.cArr = [97,98,99,100,101,118,122,104,952,105,107,108,109,110,958,111,112,347,113,114,115,116,117,120,966,968,102]
				this.cArr2 = [65,66,67,68,69,86,90,72,920,73,75,76,77,78,926,79,80,346,81,82,83,84,85,88,934,936,70]
				this.vArr = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900]
				this.vArr2 = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900]
                }
				break;
                
                 case "Novem Maximus":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [9,18,27,36,45,54,63,72,81,90,99,108,117,126,135,144,153,162,171,180,189,198,207,216,225,234]
				this.vArr2 = [9,18,27,36,45,54,63,72,81,90,99,108,117,126,135,144,153,162,171,180,189,198,207,216,225,234]
				break;
				
			case "Elizabethan Simple":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 11, 12, 13,14,15,16, 17, 18, 19, 20, 20, 21, 22, 23, 24]
				this.vArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 11, 12, 13,14,15,16, 17, 18, 19, 20, 20, 21, 22, 23, 24]
				break;

			case "Elizabethan Reverse":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [24,23,22,21,20,19,18,17,16,16,15,14,13,12,11,10,9,8,7,6,5,5,4,3,2,1]
				this.vArr2 = [24,23,22,21,20,19,18,17,16,16,15,14,13,12,11,10,9,8,7,6,5,5,4,3,2,1]
				break;
				
			case "Elizabethan Short":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 2, 3, 4,5,6,7, 8, 9, 1, 2, 2, 3, 4, 5, 6]
				this.vArr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 2, 3, 4,5,6,7, 8, 9, 1, 2, 2, 3, 4, 5, 6]
				break;
				
			case "Elizabethan Short Rev":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [6,5,4,3,2,1,9,8,7,7,6,5,4,3,2,1,9,8,7,6,5,5,4,3,2,1]
				this.vArr2 = [6,5,4,3,2,1,9,8,7,7,6,5,4,3,2,1,9,8,7,6,5,5,4,3,2,1]
				break;
				
			case "Elizabethan Kaye":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [27,28,29,30,31,32,33,34,35,35,10,11,12,13,14,15,16,17,18,19,20,20,21,22,23,24]
				this.vArr2 = [27,28,29,30,31,32,33,34,35,35,10,11,12,13,14,15,16,17,18,19,20,20,21,22,23,24]
				break;
				
			case "Modern Kaye":
				for (y = 0; y < 26; y++) {
					this.cArr[y] = (y + 97)
					this.cArr2[y] = (y + 65)
				}
				this.vArr = [27,28,29,30,31,32,33,34,35,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
				this.vArr2 = [27,28,29,30,31,32,33,34,35,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
				break;
				
                
                
                
		}

		if (impMods.indexOf("Exception") > -1) {this.Exception = true}
		if (impMods.indexOf("Reverse") > -1) {this.Reverse_Order()}
		if (impMods.indexOf("SeptenaryNum") > -1) {this.Make_Septenary()}
		if (impMods.indexOf("ALW") > -1) {this.Make_ALW()}
		if (impMods.indexOf("KFW") > -1) {this.Make_KFW()}
		if (impMods.indexOf("LCH") > -1) {this.Make_LCH()}
		if (impMods.indexOf("Bacon") > -1) {this.Make_Bacon()}
		if (impMods.indexOf("BaconInversed") > -1) {this.Make_BaconInversed()}
		if (impMods.indexOf("Baconis") > -1) {this.Make_Baconis()}
		if (impMods.indexOf("BaconisInversed") > -1) {this.Make_BaconisInversed()}
		if (impMods.indexOf("SatanicNum") > -1) {this.Make_Satanic()}
		if (impMods.indexOf("FullReduction") > -1) {this.Reduce_Full()}
		if (impMods.indexOf("SingleReduction") > -1) {this.Reduce_Single()}
		if (impMods.indexOf("Extend") > -1) {this.Extend()}
		if (impMods.indexOf("PrimeNum") > -1) {this.Make_Primes()}
		if (impMods.indexOf("TriangleNum") > -1) {this.Make_Trigonal()}
		if (impMods.indexOf("SquareNum") > -1) {this.Make_Squares()}
		if (impMods.indexOf("SumerianNum") > -1) {this.Make_Sumerian()}
		if (impMods.indexOf("KeyNum") > -1) {this.Make_KeyAlt()}
	}

	 Gematria(impVal, impType, wLink = false, impHistory = false) {
		var cIndex, x, z, tStr, GemTotal
		GemTotal = 0; this.cp = []; this.cv = []
		for (x = 0; x < impVal.length; x++) {
			z = impVal.charCodeAt(x);
			cIndex = this.cArr.indexOf(z)
			if (cIndex > -1) {GemTotal += this.vArr[cIndex]} else {
				cIndex = this.cArr2.indexOf(z)
				if (cIndex > -1) {GemTotal += this.vArr2[cIndex]} else {
					cIndex = this.cArr3.indexOf(z)
					if (cIndex > -1) {GemTotal += this.vArr3[cIndex]}
				}
			}
		}

		if (opt_NumCalculation == "Reduced") {
			for (x = 0; x < impVal.length; x++) {
				z = impVal.charCodeAt(x);
				if (z > 47 && z < 58) {
					GemTotal += z - 48
				}
			}
		} else if (opt_NumCalculation == "Full" || NumberArray() == true) {
			var curNum = ""
			var kArr = [48,49,50,51,52,53,54,55,56,57]
			var nArr = [0,1,2,3,4,5,6,7,8,9]
			for (x = 0; x < impVal.length; x++) {
				z = impVal.charCodeAt(x);
				if (kArr.indexOf(z) > -1)  {
					curNum = String(curNum) + String(nArr[kArr.indexOf(z)])
				} else if (curNum.length > 0 && z !== 44) {
					GemTotal = Number(curNum)  
					curNum = ""
				}
			}
			if (curNum.length > 0) {
				GemTotal += Number(curNum)
			}
		}

		if (GemTotal > 999999) {
			return ">1 mil"
		} else if (impType == 1) {
			return GemTotal
		} else {
			if (impHistory == false && GemTotal > 0 && GemTotal < 10000000) {
				if (wLink == true || this.Nickname == breakCipher) {
					tStr = '<a href="javascript:Open_Properties(' + GemTotal + ')" onmouseover="javascript:Populate_Breakdown('
					tStr += "'" + this.Nickname + "', false"
					tStr += ')" onmouseout="Populate_Breakdown()">' + GemTotal + '</a>'
				} else if (wLink == "NoHeader" && impHistory == false) {
					tStr = '<a href="javascript:Populate_Breakdown('
					tStr += "'" + this.Nickname + "', true"
					tStr += ')" onmouseover="javascript:cipherHead_mouseOver('
					tStr += "'" + this.Nickname + "', false"
					tStr += ')" onmouseout="Populate_Breakdown()">' + GemTotal + '</a>'
				} else {
					tStr = GemTotal
				}
			} else {
				tStr = GemTotal
			}

			if (impHistory == false && opt_Reduce == true && GemTotal > 0) {
				tStr += '<font style="font-size: 50%"><BR>' + ReducedNum(GemTotal, true) + '</font>'
			}
			return tStr
		}
	}

	Breakdown(impVal) {
		var x, z, cIndex, wordSum
		var lastSpace = true
		
		this.cp = []; this.cv = []; this.curNum = ""; this.LetterCount = 0

		this.sumArr = []; wordSum = 0
		for (x = 0; x < impVal.length; x++) {

			z = impVal.charCodeAt(x);

			if (z > 47 && z < 58) {
				if (opt_NumCalculation == "Full") {
					this.curNum = String(this.curNum) + String(z - 48)
					if (lastSpace == false) {
						this.cp.push(" ")
						this.cv.push(" ")
						this.sumArr.push(wordSum)
						wordSum = 0
						lastSpace = true
					}
				} else if (opt_NumCalculation == "Reduced") {
					this.cp.push("num" + String(z - 48))
					this.cv.push(z - 48)
					this.curNum = String(z - 48)
					wordSum += z - 48
					lastSpace = false
				}

			} else {
				if (opt_NumCalculation == "Full") {
					if (this.curNum.length > 0 & z !== 44) {
						this.cp.push("num" + String(this.curNum), " ")
						this.cv.push(Number(this.curNum), " ")
						this.sumArr.push(Number(this.curNum))
						this.curNum = ""
					}
				}
				
				if (ignoreArr.indexOf(z) == -1) {
					cIndex = this.cArr.indexOf(z)
					if (cIndex > -1) {lastSpace = false; wordSum += this.vArr[cIndex]; this.cp.push(z); this.LetterCount++; this.cv.push(this.vArr[cIndex])} else {
						cIndex = this.cArr2.indexOf(z)
						if (cIndex > -1) {lastSpace = false; wordSum += this.vArr2[cIndex]; this.cp.push(z); this.LetterCount++; this.cv.push(this.vArr2[cIndex])} else {
							cIndex = this.cArr3.indexOf(z)
							if (cIndex > -1) {lastSpace = false; wordSum += this.vArr3[cIndex]; this.cp.push(z); this.LetterCount++; this.cv.push(this.vArr3[cIndex])
							} else if (z !== 39 && lastSpace == false) {
								this.sumArr.push(wordSum)
								wordSum = 0
								this.cp.push(" ")
								this.cv.push(" ")
								lastSpace = true
							}
						}
					}
				}
			}
		}
		if (lastSpace == false) {this.sumArr.push(wordSum)}
		if (this.curNum !== "") {
			if (opt_NumCalculation == "Full") {
				this.cp.push("num" + String(this.curNum))
				this.cv.push(Number(this.curNum))
				this.sumArr.push(Number(this.curNum))
				if (this.sumArr.length > 1) {this.cp.push(" "); this.cv.push(" ")}
			}
		}
		if (this.sumArr.length > 1 && lastSpace == false) {this.cp.push(" "); this.cv.push(" ")}

		this.WordCount = this.sumArr.length
	} 

	Make_Bacon() {
		var tempArr = []
		var tempArr2 = []
		var x
		for (x = 0; x < this.vArr.length; x++) {
			tempArr.push(this.vArr[x])
			tempArr2.push(this.cArr[x])
		}
		for (x = 0; x < this.vArr2.length; x++) {
			tempArr.push(this.vArr2[x] + this.cArr2.length)
			tempArr2.push(this.cArr2[x])
		}
		this.vArr2 = []; this.cArr2 = []
		for (x = 0; x < tempArr.length; x++) {
			this.vArr[x] = tempArr[x]
			this.cArr[x] = tempArr2[x]
		}
	}
	
		Make_BaconInversed() {
		var tempArr = []
		var tempArr2 = []
		var x
		for (x = 0; x < this.vArr.length ; x++) {
			tempArr.push(this.vArr2[x])
			tempArr2.push(this.cArr2[x])
		}
		for (x = 0; x < this.vArr2.length ; x++) {
			tempArr.push(this.vArr[x] + this.cArr2.length)
			tempArr2.push(this.cArr[x])
		}
		this.vArr2 = []; this.cArr2 = []
		for (x = 0; x < tempArr.length; x++) {
			this.vArr[x] = tempArr[x]
			this.cArr[x] = tempArr2[x]
		}
	}
	
	
	
	
	Make_Baconis() {
		var tempArr = []
		var tempArr2 = []
		var x
		for (x = 0; x < this.vArr.length; x++) {
			tempArr.push((this.vArr2[x] * 2) - 1)
			tempArr.push(this.vArr[x] * 2)
			tempArr2.push(this.cArr2[x])
			tempArr2.push(this.cArr[x])
		}
		this.vArr2 = []; this.cArr2 = []
		for (x = 0; x < tempArr.length; x++) {
			this.vArr[x] = tempArr[x]
			this.cArr[x] = tempArr2[x]
		}
	}
	
	Make_BaconisInversed() {
		var tempArr = []
		var tempArr2 = []
		var x
		for (x = 0; x < this.vArr.length; x++) {
			tempArr.push((this.vArr[x] * 2) - 1)
			tempArr.push(this.vArr2[x] * 2)
			tempArr2.push(this.cArr[x])
			tempArr2.push(this.cArr2[x])
		}
		this.vArr2 = []; this.cArr2 = []
		for (x = 0; x < tempArr.length; x++) {
			this.vArr[x] = tempArr[x]
			this.cArr[x] = tempArr2[x]
		}
	}
	

	Reverse_Order() {
		this.cArr.reverse()
		this.cArr2.reverse()
	}

	Reduce_Full() {
		var x, tDig

		for (x = 0; x < this.vArr.length; x++) {
			tDig = this.vArr[x]
			while (isReduced(tDig, this.Exception) === false) {
				tDig = ReducedNum(tDig)
			}
			this.vArr[x] = tDig
		}

		if (this.vArr2.length > 0) {
			for (x = 0; x < this.vArr2.length; x++) {
				tDig = this.vArr2[x]
				while (isReduced(tDig, this.Exception) === false) {
					tDig = ReducedNum(tDig)
				}
				this.vArr2[x] = tDig
			}
		}

		if (this.vArr3.length > 0) {
			for (x = 0; x < this.vArr3.length; x++) {
				tDig = this.vArr3[x]
				while (isReduced(tDig, this.Exception) === false) {
					tDig = ReducedNum(tDig)
				}
				this.vArr3[x] = tDig
			}
		}
	}

	Reduce_Single() {
		var x, tDig

		for (x = 0; x < this.vArr.length; x++) {
			tDig = this.vArr[x]
			if (isReduced(tDig, this.Exception) === false) {
				this.vArr[x] = ReducedNum(tDig, false, true)
			}
		}
		for (x = 0; x < this.vArr2.length; x++) {
			tDig = this.vArr2[x]
			if (isReduced(tDig, this.Exception) === false) {
				this.vArr2[x] = ReducedNum(tDig, false, true)
			}
		}
		for (x = 0; x < this.vArr3.length; x++) {
			tDig = this.vArr3[x]
			if (isReduced(tDig, this.Exception) === false) {
				this.vArr3[x] = ReducedNum(tDig, false, true)
			}
		}
	}
	Extend() {
		var tDig, numZero, x
		for (x = 0; x < this.vArr.length; x++) {
			tDig = String(this.vArr[x])
			if (tDig > 9) {numZero = Number(tDig.substring(0, 1))} else {numZero = 0}
			while (tDig > 9) {
				tDig = ReducedNum(tDig, false, true)
				if (tDig > 9) {numZero++}
			}
			this.vArr[x] = tDig * (Math.pow(10, numZero))
		}
		for (x = 0; x < this.vArr2.length; x++) {
			tDig = String(this.vArr2[x])
			if (tDig > 9) {numZero = Number(tDig.substring(0, 1))} else {numZero = 0}
			while (tDig > 9) {
				tDig = ReducedNum(tDig, false, true)
				if (tDig > 9) {numZero++}
			}
			this.vArr2[x] = tDig * (Math.pow(10, numZero))
		}
		for (x = 0; x < this.vArr3.length; x++) {
			tDig = String(this.vArr3[x])
			if (tDig > 9) {numZero = Number(tDig.substring(0, 1))} else {numZero = 0}
			while (tDig > 9) {
				tDig = ReducedNum(tDig, false, true)
				if (tDig > 9) {numZero++}
			}
			this.vArr3[x] = tDig * (Math.pow(10, numZero))
		}
	}
	Fold() {
		var x
		if (this.vArr.length = 26) {
			for (x = 13; x < this.vArr.length; x++) {
				this.vArr[x] = 13 - [x - 13]
			}
			if (this.vArr2.length > 0) {
				if (this.vArr2.length = 26) {
					for (x = 13; x < this.vArr2.length; x++) {
						this.vArr2[x] = 13 - [x - 13]
					}
				}
			}
		}
		if (this.vArr.length = 27) {
			for (x = 14; x < this.vArr.length; x++) {
				this.vArr[x] = 13 - [x - 14]
			}
			if (this.vArr2.length > 0) {
				if (this.vArr2.length = 26) {
					for (x = 14; x < this.vArr2.length; x++) {
						this.vArr2[x] = 13 - [x - 14]
					}
				}
			}
		}
	}
	Make_Satanic() {
		var x
		for (x = 0; x < this.vArr.length; x++) {
			this.vArr[x] += 35
		}
		if (this.vArr2.length > 0) {
			for (x = 0; x < this.vArr2.length; x++) {
				this.vArr2[x] += 35
			}
		}
		if (this.vArr3.length > 0) {
			for (x = 0; x < this.vArr3.length; x++) {
				this.vArr3[x] += 35
			}
		}
	}
	Make_ALW() {
		this.cArr = [97, 108, 119, 104, 115, 100, 111, 122, 107, 118, 103, 114, 99, 110, 121, 106, 117, 102, 113, 98, 109, 120, 105, 116, 101, 112]
		this.cArr2 = [65, 76, 87, 72, 83, 68, 79, 90, 75, 86, 71, 82, 67, 78, 89, 74, 85, 70, 81, 66, 77, 88, 73, 84, 69, 80]
	}
	Make_KFW() {
		this.cArr = [107, 102, 119, 114, 109, 100, 121, 116, 97, 118, 113, 104, 99, 120, 111, 106, 101, 108, 103, 98, 115, 110, 105, 122, 117, 112]
		this.cArr2 = [75, 70, 87, 82, 77, 68, 89, 84, 65, 86, 81, 72, 67, 88, 79, 74, 69, 76, 71, 66, 83, 78, 73, 90, 85, 80]
	}
	Make_LCH() {
		var x
		this.cArr = [105, 108, 99, 104, 112, 97, 120, 106, 119, 116, 111, 103, 102, 101, 114, 115, 113, 107, 121, 122, 98, 109, 118, 100, 110, 117]
		this.cArr2 = [73, 76, 67, 72, 80, 65, 88, 74, 87, 84, 79, 71, 70, 69, 82, 83, 81, 75, 89, 90, 66, 77, 86, 68, 78, 85]
		for (x = 0; x < this.cArr.length; x++) {
			this.vArr[x] = x
			this.vArr2[x] = x
		}
	}
	Make_Primes() {
		var x
		for (x = 0; x < this.vArr.length; x++) {
			this.vArr[x] = primeArr[this.vArr[x] - 1]
		}
		if (this.vArr2.length > 0) {
			for (x = 0; x < this.vArr2.length; x++) {
				this.vArr2[x] = primeArr[this.vArr2[x] - 1]
			}
		}
		if (this.vArr3.length > 0) { 
			for (x = 0; x < this.vArr3.length; x++) {
				this.vArr3[x] = primeArr[this.vArr3[x] - 1]
			}
		}
	}
	Make_Trigonal() {
		var x
		this.vArr[0] = 1
		for (x = 0; x < this.vArr.length; x++) {
			this.vArr[x] = this.vArr[x] * (this.vArr[x] + 1) / 2
		}
		if (this.vArr2.length > 0) {
			for (x = 0; x < this.vArr2.length; x++) {
				this.vArr2[x] = this.vArr2[x] * (this.vArr2[x] + 1) / 2
			}
		}
		if (this.vArr3.length > 0) {
			for (x = 0; x < this.vArr3.length; x++) {
				this.vArr3[x] = this.vArr3[x] * (this.vArr3[x] + 1) / 2
			}
		}
	}
	Make_Squares() {
		var x
		for (x = 0; x < this.vArr.length; x++) {
			this.vArr[x] = this.vArr[x] * this.vArr[x]
		}
		if (this.vArr2.length > 0) {
			for (x = 0; x < this.vArr2.length; x++) {
				this.vArr2[x] = this.vArr2[x] * this.vArr2[x]
			}
		}
		if (this.vArr3.length > 0) {
			for (x = 0; x < this.vArr3.length; x++) {
				this.vArr3[x] = this.vArr3[x] * this.vArr3[x]
			}
		}
	}
	Make_Sumerian() {
		var x
		for (x = 0; x < 26; x++) {
			this.vArr[x] = this.vArr[x] * 6
		}
		if (this.vArr2.length > 0) {
			for (x = 0; x < 26; x++) {
				this.vArr2[x] = this.vArr2[x] * 6
			}
		}
		if (this.vArr3.length > 0) {
			for (x = 0; x < 26; x++) {
				this.vArr3[x] = this.vArr3[x] * 6
			}
		}
	}
	Make_Septenary() {
		this.vArr = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]
		if (this.vArr2.length > 0) {
			this.vArr2 = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]
		}
	}
	Make_KeyAlt() {
		this.vArr = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 0, 7, 7, 8, 8, 8, 9, 9, 9, 0]
		this.vArr2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 0, 7, 7, 8, 8, 8, 9, 9, 9, 0]
	}
	
	

}

function Build_GemVals(impCipher) {
	var x
	for (x = 0; x < impCipher.cArr.length; x++) {
		impCipher.vArr[x] = (x + 1)
	}
	if (impCipher.cArr2.length > 0) {
		for (x = 0; x < impCipher.cArr2.length; x++) {
			impCipher.vArr2[x] = (x + 1)
		}
	}
}

function Populate_Sums(impVal) {
	var x, gSum
	gemArr = []

	for (x = 0; x < ciphersOn.length; x++) {
		gemArr[x] = ciphersOn[x].Gematria(impVal, 1)
		if (opt_Headers == true) {
			gSum = ciphersOn[x].Gematria(impVal, 2, true)
		} else {
			gSum = ciphersOn[x].Gematria(impVal, 2, "NoHeader")
		}
		document.getElementById(ciphersOn[x].Nickname + "_Sum").innerHTML = gSum
	}
}

function Open_Properties(impNum) {
	if (impNum > 0 && impNum < 10000000) {
		window.open("http://www.gematrinator.com/calculator/numberProperties.php?Number=" + impNum, "Properties of " + impNum, "height=480,width=750")
	}
}

function GetTriangular(impNum) {
	var x
	x = (impNum * (impNum + 1) / 2)
	return x
}

function ReducedNum(impNum, impBool = false, impSingle = false) {
	var x, s
	var cn = 0
	var x, cn

	if (impSingle == true) {
		for (x = 0; x < String(impNum).length; x++) {
			s = Number(String(impNum).slice(x, x + 1))
			cn += s
		}
		return cn
	}

	while (impNum > 9) {
		if (impBool == true) {
			if (impNum == 11 || impNum == 22 || impNum == 33) {
				return impNum
			}
		}
		cn = 0
		for (x = 0; x < String(impNum).length; x++) {
			s = Number(String(impNum).slice(x, x + 1))
			cn += s
		}
		impNum = cn
	}

	return impNum
}
function isReduced(impNum, impOpt = false) {
	if (impNum < 10) {
		return true
	} else if (impOpt === true) {
		if (impNum === 11 || impNum === 22 || impNum === 33) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

function Build_Ciphers() {
	var key

	for (key in cipherArray) {
		switch (key) {
			case "Full Reduction": allCiphers[allCiphers.length] = new cipher(key, "English", 88, 125, 254, "FullReduction"); break;
			case "Single Reduction": allCiphers[allCiphers.length] = new cipher(key, "English", 140, 171, 227, "SingleReduction"); break;
			case "Full Reduction KV": allCiphers[allCiphers.length] = new cipher(key, "English", 97, 195, 244, "FullReduction", "Exception"); break;
			case "Single Reduction KV": allCiphers[allCiphers.length] = new cipher(key, "English", 70, 175, 244, "SingleReduction", "Exception"); break;
			case "English Ordinal": allCiphers[allCiphers.length] = new cipher(key, "English", 0, 186, 0); break;
			case "English Extended": allCiphers[allCiphers.length] = new cipher(key, "English", 218, 226, 0, "Extend"); break;
			case "Francis Bacon": allCiphers[allCiphers.length] = new cipher(key, "English", 150, 244, 77, "Bacon"); break;
				
			case "Bacon Inversed": allCiphers[allCiphers.length] = new cipher(key, "English", 22, 130, 99, "BaconInversed"); break;
			case "Franc Baconis": allCiphers[allCiphers.length] = new cipher(key, "English", 93, 187, 88, "Baconis"); break;
			case "Baconis Inversed": allCiphers[allCiphers.length] = new cipher(key, "English", 99, 22, 188, "BaconisInversed"); break;	
				
			case "Satanic": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 0, 0, "SatanicNum"); break;

			case "Reverse Full Reduction": allCiphers[allCiphers.length] = new cipher(key, "English", 100, 226, 226, "Reverse", "FullReduction"); break;
			case "Reverse Single Reduction": allCiphers[allCiphers.length] = new cipher(key, "English", 100, 216, 209, "Reverse", "SingleReduction"); break;
			case "Reverse Full Reduction EP": allCiphers[allCiphers.length] = new cipher(key, "English", 101, 224, 194, "Reverse", "FullReduction", "Exception"); break;
			case "Reverse Single Reduction EP": allCiphers[allCiphers.length] = new cipher(key, "English", 110, 226, 156, "Reverse", "SingleReduction", "Exception"); break;
			case "Reverse Ordinal": allCiphers[allCiphers.length] = new cipher(key, "English", 80, 235, 21, "Reverse"); break;
			case "Reverse Extended": allCiphers[allCiphers.length] = new cipher(key, "English", 253, 255, 119, "Reverse", "Extend"); break;
				
			case "Reverse Francis Bacon": allCiphers[allCiphers.length] = new cipher(key, "English", 163, 255, 88, "Reverse", "Bacon"); break;
			case "Reverse Franc Baconis": allCiphers[allCiphers.length] = new cipher(key, "English", 111, 193, 121, "Reverse", "Baconis"); break;
				
			case "Reverse Bacon Inversed": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 163, 88, "Reverse", "BaconInversed"); break;
				
			case "Reverse Baconis Inversed": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 111, 121, "Reverse", "BaconisInversed"); break;
				
			case "Reverse Satanic": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 51, 51, "Reverse", "SatanicNum"); break;

			case "Jewish Reduction": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 159, 99, 197, "FullReduction"); break;
			case "Jewish Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 154, 121, 227); break;
			case "Jewish": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 153, 102, 255, "Extend"); break;
			case "Reverse Jewish Reduction": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 	72, 192, 112, "Reverse","FullReduction"); break;
			case "Reverse Jewish Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 	88, 208, 128, "Reverse"); break;
			case "Reverse Jewish": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 	80, 200, 120, "Reverse", "Extend"); break;
          
			
			
			case "ALW Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 64, 0, "ALW"); break;
			case "KFW Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 88, 0, "KFW"); break;
			case "LCH Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 93, 73, "LCH"); break;

			case "English Sumerian": allCiphers[allCiphers.length] = new cipher(key, "English", 169, 208, 142, "SumerianNum"); break;
			case "Reverse English Sumerian": allCiphers[allCiphers.length] = new cipher(key, "English", 220, 208, 148, "Reverse", "SumerianNum"); break;
			case "Primes": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 204, 111, "PrimeNum"); break;
			case "Trigonal": allCiphers[allCiphers.length] = new cipher(key, "English", 231, 180, 113, "TriangleNum"); break;
			case "Squares": allCiphers[allCiphers.length] = new cipher(key, "English", 228, 216, 96, "SquareNum"); break;
			case "Reverse Primes": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 209, 145, "Reverse", "PrimeNum"); break;
			case "Reverse Trigonal": allCiphers[allCiphers.length] = new cipher(key, "English", 238, 191, 112, "Reverse", "TriangleNum"); break;
			case "Reverse Squares": allCiphers[allCiphers.length] = new cipher(key, "English", 240, 225, 112, "Reverse", "SquareNum"); break;
				
			case "Fibonacci": allCiphers[allCiphers.length] = new cipher(key, "Fibonacci", 148,0,211); break;
			case "Fibonacci Reduced": allCiphers[allCiphers.length] = new cipher(key, "Fibonacci Reduced", 188,0,211); break;
			case "Reverse Fibonacci": allCiphers[allCiphers.length] = new cipher(key, "Fibonacci", 190,0,200, "Reverse"); break;
			case "Barni Yamumʹs Fibonacci Cipher": allCiphers[allCiphers.length] = new cipher(key, "Barnis Cipher", 199,0,220,); break;
				
			case "NonPrime Numbers": allCiphers[allCiphers.length] = new cipher(key, "NonPrime", 125, 66, 244,); break;
			case "Reverse NonPrime Numbers": allCiphers[allCiphers.length] = new cipher(key, "NonPrime", 125, 100, 244,"Reverse"); break;
			case "Pentagonal Numbers": allCiphers[allCiphers.length] = new cipher(key, "Pentagonal", 80, 150, 180,); break;
			case "Reverse Pentagonal Numbers": allCiphers[allCiphers.length] = new cipher(key, "Pentagonal", 80, 160, 190,"Reverse"); break;
			case "Tesla Numbers 369": allCiphers[allCiphers.length] = new cipher(key, "Tesla", 20, 120, 20,); break;
			
			case "Septenary": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 153, 77, "SeptenaryNum"); break;
			case "Chaldean": allCiphers[allCiphers.length] = new cipher(key, "Chald", 166, 166, 99); break;
			case "Keypad": allCiphers[allCiphers.length] = new cipher(key, "Keypad", 255, 126, 255); break;
			case "Isisian Codes": allCiphers[allCiphers.length] = new cipher(key, "Isisian Codes", 220,255,103); break;
		    case "Inversed": allCiphers[allCiphers.length] = new cipher(key, "Inversed", 210,220,240); break;
			case "English Ordinal Starting at 2": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 2", 121,22,124); break;
            case "English Ordinal Starting at 3": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 3", 121,22,124); break;    
            case "English Ordinal Starting at 4": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 4", 121,22,124); break;   
            case "English Ordinal Starting at 5": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 5", 121,22,124); break;
            case "English Ordinal Starting at 6": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 6", 121,22,124); break;
            case "English Ordinal Starting at 7": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 7", 121,22,124); break;    
            case "English Ordinal Starting at 8": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 8", 121,22,124); break;   
            case "English Ordinal Starting at 9": allCiphers[allCiphers.length] = new cipher(key, "English Ordinal Starting at 9", 121,22,124); break;
            case "Alphanumeric Qabbala": allCiphers[allCiphers.length] = new cipher(key, "Alphanumeric Qabbala", 191,195,127); break;   
            case "Master": allCiphers[allCiphers.length] = new cipher(key, "Master", 77,129,200); break;   
            case "Master Builder": allCiphers[allCiphers.length] = new cipher(key, "Master Builder", 77,172,148); break;   
            case "Masonic": allCiphers[allCiphers.length] = new cipher(key, "Masonic", 206,56,55); break;   
            case "Foundation": allCiphers[allCiphers.length] = new cipher(key, "Foundation", 207,80,155); break;   
                
                
		
			
			
			//Numbers//
			case "Semiprime": allCiphers[allCiphers.length] = new cipher(key, "Semiprime", 199,175,33); break;
			case "Deficient number": allCiphers[allCiphers.length] = new cipher(key, "Deficient number", 255,105,180); break;
			case "Lucky number": allCiphers[allCiphers.length] = new cipher(key, "Lucky number", 101, 244, 66); break;
			case "Padovan sequence": allCiphers[allCiphers.length] = new cipher(key, "Padovan sequence", 65, 211, 244); break;
			case "Happy number": allCiphers[allCiphers.length] = new cipher(key, "Happy number", 244, 169, 65); break;
			case "Untouchable number": allCiphers[allCiphers.length] = new cipher(key, "Untouchable number", 165, 211, 44); break;
			case "Smith number": allCiphers[allCiphers.length] = new cipher(key, "Smith number", 44, 169, 165); break;
			case "Palindromic number": allCiphers[allCiphers.length] = new cipher(key, "Palindromic number", 65, 111, 42); break;
			case "Strictly non-palindromic number": allCiphers[allCiphers.length] = new cipher(key, "Strictly non-palindromic number", 144, 169, 189); break;
			case "Magic Squares Up to 13th": allCiphers[allCiphers.length] = new cipher(key, "Magic Squares Up to 13th", 24, 269, 165); break;
			case "Magic Squares Up to 7th": allCiphers[allCiphers.length] = new cipher(key, "Magic Squares Up to 7th", 188, 188, 188); break;
			
		
			
			//Keyboard//
			case "Qwerty": allCiphers[allCiphers.length] = new cipher(key, "Qwerty", 255,192,203); break;
            case "Reverse Qwerty": allCiphers[allCiphers.length] = new cipher(key, "Qwerty", 192,203,255, "Reverse"); break;
			case "Qwertz": allCiphers[allCiphers.length] = new cipher(key, "Qwertz", 220,50,128); break;
            case "Reverse Qwertz": allCiphers[allCiphers.length] = new cipher(key, "Qwertz", 128,0,128, "Reverse"); break;
			case "Azerty": allCiphers[allCiphers.length] = new cipher(key, "Azerty", 255,0,255); break;
            case "Reverse Azerty": allCiphers[allCiphers.length] = new cipher(key, "Azerty", 0,255,255, "Reverse"); break;
			
			
			case "Polish Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Polish Ordinal", 145,78,203); break;
			case "Polish Reduction": allCiphers[allCiphers.length] = new cipher(key, "Polish Ordinal", 148,78,215,"FullReduction"); break;
			case "Polish Nous": allCiphers[allCiphers.length] = new cipher(key, "Polish Nous", 149,78,225); break;
            case "Reverse Polish Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Reverse Polish Ordinal", 200,78,150,); break;
			case "Reverse Polish Reduction": allCiphers[allCiphers.length] = new cipher(key, "Reverse Polish Ordinal", 205,78,155,"FullReduction"); break;
		
			
			case "Hebrew Reduction": allCiphers[allCiphers.length] = new cipher(key, "Hebrew G", 255, 189, 2, "FullReduction"); break;
			case "Hebrew Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Hebrew G", 255, 209, 36); break;
			case "Hebrew Gematria": allCiphers[allCiphers.length] = new cipher(key, "Hebrew G", 255, 227, 93, "Extend"); break;
			case "Hebrew Soffits": allCiphers[allCiphers.length] = new cipher(key, "Hebrew Soffits", 255, 251, 156, "Extend"); break;
			case "Arabic Reduction": allCiphers[allCiphers.length] = new cipher(key, "Arabic", 235, 200, 200, "FullReduction"); break;
			case "Arabic Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Arabic", 240, 200, 195,); break;
            case "Arabic": allCiphers[allCiphers.length] = new cipher(key, "Arabic", 255, 180, 180, "Extend"); break;
			case "Reverse Arabic Reduction": allCiphers[allCiphers.length] = new cipher(key, "Arabic", 235, 220, 220, "Reverse","FullReduction"); break;
			case "Reverse Arabic": allCiphers[allCiphers.length] = new cipher(key, "Arabic", 245, 180, 180, "Reverse", "Extend"); break;
			case "Reverse Arabic Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Arabic", 245, 185, 185, "Reverse"); break;
			

			case "Greek Reduction": allCiphers[allCiphers.length] = new cipher(key, "Greek", 156, 201, 171, "FullReduction"); break;
			case "Greek Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Greek", 149, 199, 139); break;
			case "Greek Isopsephy": allCiphers[allCiphers.length] = new cipher(key, "Greek", 139, 200, 163, "Extend"); break;
                
            case "Archaic Latin": allCiphers[allCiphers.length] = new cipher(key, "Archaic Latin", 166, 66, 99,); break;
            case "Etruscan": allCiphers[allCiphers.length] = new cipher(key, "Etruscan", 255, 99, 66,); break;
                
            case "Novem Maximus": allCiphers[allCiphers.length] = new cipher(key, "Novem Maximus", 166, 199, 66,); break;
                
				// Elizabethan Ciphers
			case "Elizabethan Simple": allCiphers[allCiphers.length] = new cipher(key, "Elizabethan Simple", 80, 235, 21); break;
			case "Elizabethan Reverse": allCiphers[allCiphers.length] = new cipher(key, "Elizabethan Reverse", 0, 186, 0); break;
			case "Elizabethan Short": allCiphers[allCiphers.length] = new cipher(key, "Elizabethan Short", 100, 216, 209); break;
			case "Elizabethan Short Rev": allCiphers[allCiphers.length] = new cipher(key, "Elizabethan Short Rev", 88, 125, 254); break;
			case "Elizabethan Kaye": allCiphers[allCiphers.length] = new cipher(key, "Elizabethan Kaye", 220, 93, 73); break;
			case "Modern Kaye": allCiphers[allCiphers.length] = new cipher(key, "Modern Kaye", 230, 153, 163); break;

		}
	}

	Build_Open_Ciphers()
}

function Set_Categories() {
	catArr = ["English", "Reverse", "Jewish", "Kabbalah", "Mathematical", "Fibonacci", "Other", "Foreign", "Arabic Alphabet","Polish Alphabet","Keyboard","Numbers","English Ordinal Custom","Old Italic","Elizabethan"]

	cipherArray["English Ordinal"] = "English"
	cipherArray["Full Reduction"] = "English"
	cipherArray["Single Reduction"] = "English"
	cipherArray["Full Reduction KV"] = "English"
	cipherArray["Single Reduction KV"] = "English"
	cipherArray["English Extended"] = "English"
	cipherArray["Francis Bacon"] = "English"
	cipherArray["Franc Baconis"] = "English"
	cipherArray["Bacon Inversed"] = "English"
	cipherArray["Baconis Inversed"] = "English"
	cipherArray["Satanic"] = "English"

	cipherArray["Reverse Ordinal"] = "Reverse"
	cipherArray["Reverse Full Reduction"] = "Reverse"
	cipherArray["Reverse Single Reduction"] = "Reverse"
	cipherArray["Reverse Full Reduction EP"] = "Reverse"
	cipherArray["Reverse Single Reduction EP"] = "Reverse"
	cipherArray["Reverse Extended"] = "Reverse"
	cipherArray["Reverse Francis Bacon"] = "Reverse"
	cipherArray["Reverse Franc Baconis"] = "Reverse"
	cipherArray["Reverse Bacon Inversed"] = "Reverse"
	cipherArray["Reverse Baconis Inversed"] = "Reverse"
	cipherArray["Reverse Satanic"] = "Reverse"

	cipherArray["Jewish Reduction"] = "Jewish"
	cipherArray["Jewish Ordinal"] = "Jewish"	
	cipherArray["Jewish"] = "Jewish"
	cipherArray["Reverse Jewish Reduction"] = "Jewish"
	cipherArray["Reverse Jewish Ordinal"] = "Jewish"
	cipherArray["Reverse Jewish"] = "Jewish"
	
	cipherArray["ALW Kabbalah"] = "Kabbalah"
	cipherArray["KFW Kabbalah"] = "Kabbalah"
	cipherArray["LCH Kabbalah"] = "Kabbalah"

	cipherArray["English Sumerian"] = "Mathematical"
	cipherArray["Reverse English Sumerian"] = "Mathematical"
	cipherArray["Primes"] = "Mathematical"
	cipherArray["Trigonal"] = "Mathematical"
	cipherArray["Squares"] = "Mathematical"
	cipherArray["Reverse Primes"] = "Mathematical"
	cipherArray["Reverse Trigonal"] = "Mathematical"
	cipherArray["Reverse Squares"] = "Mathematical"
	cipherArray["NonPrime Numbers"] = "Mathematical"
	cipherArray["Reverse NonPrime Numbers"] = "Mathematical"
	cipherArray["Pentagonal Numbers"] = "Mathematical"
	cipherArray["Reverse Pentagonal Numbers"] = "Mathematical"
	cipherArray["Tesla Numbers 369"] = "Mathematical"

    cipherArray["Fibonacci"] = "Fibonacci"
	cipherArray["Fibonacci Reduced"] = "Fibonacci"
	cipherArray["Reverse Fibonacci"] = "Fibonacci"
	cipherArray["Barni Yamumʹs Fibonacci Cipher"] = "Fibonacci"
	
	cipherArray["Septenary"] = "Other"
	cipherArray["Chaldean"] = "Other"
	cipherArray["Keypad"] = "Other"
	cipherArray["Isisian Codes"] = "Other"
	cipherArray["Inversed"] = "Other"
    cipherArray["Novem Maximus"] = "Other"
        
	cipherArray["English Ordinal Starting at 2"] = "English Ordinal Custom"
	cipherArray["English Ordinal Starting at 3"] = "English Ordinal Custom"
    cipherArray["English Ordinal Starting at 4"] = "English Ordinal Custom"
    cipherArray["English Ordinal Starting at 5"] = "English Ordinal Custom"
    cipherArray["English Ordinal Starting at 6"] = "English Ordinal Custom"
    cipherArray["English Ordinal Starting at 7"] = "English Ordinal Custom"
    cipherArray["English Ordinal Starting at 8"] = "English Ordinal Custom"
    cipherArray["English Ordinal Starting at 9"] = "English Ordinal Custom"
    cipherArray["Alphanumeric Qabbala"] = "English Ordinal Custom"
    cipherArray["Master"] = "English Ordinal Custom"
    cipherArray["Master Builder"] = "English Ordinal Custom"
    cipherArray["Masonic"] = "English Ordinal Custom"
    cipherArray["Foundation"] = "English Ordinal Custom"
    
    cipherArray["Archaic Latin"] = "Old Italic"
    cipherArray["Etruscan"] = "Old Italic"
        
	cipherArray["Semiprime"] = "Numbers"
	cipherArray["Deficient number"] = "Numbers"
	cipherArray["Lucky number"] = "Numbers"
	cipherArray["Padovan sequence"] = "Numbers"
	cipherArray["Happy number"] = "Numbers"
	cipherArray["Untouchable number"] = "Numbers"
	cipherArray["Smith number"] = "Numbers"
	cipherArray["Palindromic number"] = "Numbers"
	cipherArray["Strictly non-palindromic number"] = "Numbers"
	cipherArray["Magic Squares Up to 13th"] = "Numbers"
	cipherArray["Magic Squares Up to 7th"] = "Numbers"
	
	cipherArray["Qwerty"] = "Keyboard"
    cipherArray["Reverse Qwerty"] = "Keyboard"
	cipherArray["Qwertz"] = "Keyboard"
    cipherArray["Reverse Qwertz"] = "Keyboard"
	cipherArray["Azerty"] = "Keyboard"
	cipherArray["Reverse Azerty"] = "Keyboard"
    
	cipherArray["Polish Ordinal"] = "Polish Alphabet"
	cipherArray["Polish Reduction"] = "Polish Alphabet"
	cipherArray["Polish Nous"] = "Polish Alphabet"
	cipherArray["Reverse Polish Ordinal"] = "Polish Alphabet"
	cipherArray["Reverse Polish Reduction"] = "Polish Alphabet"

	cipherArray["Hebrew Reduction"] = "Foreign"
	cipherArray["Hebrew Ordinal"] = "Foreign"
	cipherArray["Hebrew Gematria"] = "Foreign"
	cipherArray["Hebrew Soffits"] = "Foreign"

	cipherArray["Hebrew Reduction"] = "Foreign"
	cipherArray["Hebrew Ordinal"] = "Foreign"
	cipherArray["Hebrew Gematria"] = "Foreign"
	cipherArray["Hebrew Soffits"] = "Foreign"
	
	cipherArray["Greek Reduction"] = "Foreign"
	cipherArray["Greek Ordinal"] = "Foreign"
	cipherArray["Greek Isopsephy"] = "Foreign"
	
	cipherArray["Arabic"] = "Arabic Alphabet"
	cipherArray["Arabic Reduction"] = "Arabic Alphabet"
	cipherArray["Arabic Ordinal"] = "Arabic Alphabet"
	cipherArray["Reverse Arabic"] = "Arabic Alphabet"
	cipherArray["Reverse Arabic Reduction"] = "Arabic Alphabet"
	cipherArray["Reverse Arabic Ordinal"] = "Arabic Alphabet"
	
	cipherArray["Elizabethan Simple"] = "Elizabethan"
	cipherArray["Elizabethan Reverse"] = "Elizabethan"
	cipherArray["Elizabethan Short"] = "Elizabethan"
	cipherArray["Elizabethan Short Rev"] = "Elizabethan"
	cipherArray["Elizabethan Kaye"] = "Elizabethan"
	cipherArray["Modern Kaye"] = "Elizabethan"
	
}

function Add_Cipher(impName, impBool = true) {
	var x, q

	q = 0
	for (x = 0; x < allCiphers.length; x++) {
		if (allCiphers[x].Nickname == impName) {
			openCiphers.splice(q, 0, impName)
		} else if (openCiphers.indexOf(allCiphers[x].Nickname) > -1) {
			q++
		}
	}

	Build_Open_Ciphers()

	if (impBool == true) {breakCipher = impName; Populate_Breakdown()}
}
function Remove_Cipher(impName) {
	var x

	x = openCiphers.indexOf(impName)
	if (x > -1) {
		openCiphers.splice(x, 1)
	}
	Build_Open_Ciphers()
	if (breakCipher == impName) {
		if (openCiphers.length > 0) {breakCipher = openCiphers[0]} else {breakCipher = ""}
		Populate_Breakdown()
	}
}
function Add_AllCiphers(impBool = false) {
	var x, q, cN, z

	for (x = 0; x < allCiphers.length; x++) {
		q = 0
		cN = allCiphers[x].Nickname
		if (openCiphers.indexOf(cN) == -1 && cN.indexOf("Hebrew") == -1 && cN.indexOf("Greek") == -1 && cN.indexOf("Latin") == -1 && cN.indexOf("Arabic") == -1 && cN.indexOf("Polish") == -1) {
			for (z = 0; z < allCiphers.length; z++) {
				if (allCiphers[z].Nickname == cN) {
					openCiphers.splice(q, 0, cN)
					break;
				} else if (openCiphers.indexOf(allCiphers[z].Nickname) > -1) {
					q++
				}
			}
		}
	}

	Build_Open_Ciphers()
	if (impBool == true) {
		Open_Ciphers()
	} else {
		Populate_MenuBar()
	}
}
function Add_BaseCiphers(impBool = false) {
	var x, q, cN, z
	var baseCiphers = ["English Ordinal", "Full Reduction", "Reverse Ordinal", "Reverse Full Reduction"]

	openCiphers = []
	for (z = 0; z < allCiphers.length; z++) {
		if (baseCiphers.indexOf(allCiphers[z].Nickname) > -1) {
			openCiphers.push(allCiphers[z].Nickname)
		}
	}

	Build_Open_Ciphers()
	if (impBool == true) {
		Open_Ciphers()
	} else {
		Populate_MenuBar()
	}
}
function No_Ciphers() {
    openCiphers = []
    Build_Open_Ciphers()
    Open_Ciphers()
    document.getElementById("Gematria_Table").innerHTML = "" // empty cipher table
    Open_History() // update table
}
function FindSpot(impName) {
	for (x = 0; x < allCiphers.length; x++) {
		if (allCiphers[x].Nickname == impName) {
			return x;
		}
	}
}

function Slide_Cipher(impDir) {
	var x, y, z, q, tempCipher

	if (breakCipher == "") {return;}

	x = FindSpot(breakCipher)
	q = openCiphers.indexOf(breakCipher)
	if (impDir == "up") {
		if (q > 0) {openCiphers.splice(q, 1); openCiphers.splice(q - 1, 0, breakCipher)}
	} else {
		if (q !== openCiphers.length - 1) {openCiphers.splice(q, 1); openCiphers.splice(q + 1, 0, breakCipher)}
	}

	switch (impDir.toLowerCase()) {
		case "up":
			for (z = x - 1; z > -1; z--) {
				if (isCipherOn(allCiphers[z].Nickname) > -1) {
					allCiphers.splice(z, 0, allCiphers[x])
					allCiphers.splice(x + 1, 1)
					break;
				}
			}
			break;
		case "down":
			for (z = x + 1; z < allCiphers.length; z++) {
				if (isCipherOn(allCiphers[z].Nickname) > -1) {
					allCiphers.splice(z + 1, 0, allCiphers[x])
					allCiphers.splice(x, 1)
					break;
				}
			}
			break;
	}

	RestoreField()
	Build_Open_Ciphers()
}

function Build_Open_Ciphers() {
	var x, z

	ciphersOn = []

	for (x = 0; x < openCiphers.length; x++) {
		for (z = 0; z < allCiphers.length; z++) {
			if (allCiphers[z].Nickname == openCiphers[x]) {
				ciphersOn[ciphersOn.length] = allCiphers[z]
				break;
			}
		}
	}

	Build_Table(opt_Headers)
}

function Load_Options(ApplyOptions = false) {
	qString = "http://www.gematrinator.com/usersettings/viewIP.php"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
	  		respText = xhttp.responseText
	  		if (ApplyOptions == true) {
	  			ParseText()
	  		} else {
				if (respText !== "New Record Added" && respText !== "Error") {
					opt_InTable = true
					Populate_MenuBar()
				} else {
					opt_InTable = false
				}
	  		}
		}
	}

	xhttp.open("GET", qString, true);
	xhttp.send();
}

function ParseText() {
	var tempArr = []; tempCiphers = []
	var x

	openCiphers = []

	if (respText !== "New Record Added" && respText !== "Error") {
		tempArr = respText.split(":;")

		tempCiphers = tempArr[0].split("|")
		sHistory = tempArr[1].split("|")
		if (sHistory[sHistory.length] == "") {
			sHistory.pop()
		}

		for (x = 0; x < tempCiphers.length; x++) {
			if (openCiphers.indexOf(tempCiphers[x]) === -1) {openCiphers.push(tempCiphers[x])}
		}
		
		if (tempArr[2] == "" || tempArr[2] == null) {
			opt_NumCalculation = "Off"
		} else {
			opt_NumCalculation = tempArr[2]
		}
		if (tempArr[3] == "" || tempArr[3] == null) {
			opt_Breakdown = "Chart"
		} else {
			opt_Breakdown = tempArr[3]
		}
		if (tempArr[4] == "" || tempArr[4] == null) {
			ciphers_per_row = 6
		} else {
			ciphers_per_row = tempArr[4]
		}
		if (tempArr[5] == "false") {opt_Reduce = false} else {opt_Reduce = true}
		if (tempArr[6] == "false") {opt_Quotes = false} else {opt_Quotes = true}
		if (tempArr[7] == "false") {opt_Summ = false} else {opt_Summ = true}
		if (tempArr[8] == "false") {opt_Chart = false} else {opt_Chart = true}
		if (tempArr[9] == "false") {opt_Shortcuts = false} else {opt_Shortcuts = true}
		if (tempArr[10] == "false") {opt_Headers = false} else {opt_Headers = true}
	}

	if (openCiphers.length == 0) {
		openCiphers = ["English Ordinal", "Full Reduction", "Reverse Ordinal", "Reverse Full Reduction"]
	}

	LoadCipherOrder()
	Build_Open_Ciphers()
}

function LoadCipherOrder() {
	var x, z, tC, nC

	for (x = openCiphers.length - 1; x > -1; x--) {
		tC = openCiphers[x]
		for (z = 0; z < allCiphers.length; z++) {
			if (allCiphers[z].Nickname == tC) {
				nC = allCiphers[z]
				allCiphers.splice(z, 1)
				allCiphers.splice(0, 0, nC)
			}
		}
	}
}	
