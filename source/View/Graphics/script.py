arr = ["12-14 : [144.46245,52.525051]","15-3 : [90.953278,81.311958]","15-12 : [138.0491,60.806751]","13-15 : [152.33624,43.873405]","3-12 : [139.10745,78.798416]","15-2 : [54.96994,79.592163]","15-1 : [29.040806,66.098419]","12-6 : [161.33249,90.969246]","4-6 : [148.10327,134.89011]","2-3 : [38.565804,105.25674]","3-4 : [82.486633,137.5359]","1-2 : [5.2283015,84.619247]","4-5 : [157.09914,160.81923]","6-7 : [191.49504,84.09008]","5-6 : [187.26169,129.06923]","11-16 : [172.97415,56.573418]","10-11 : [178.26582,42.285912]","9-10 : [197.84503,38.052582]","7-8 : [202.60739,62.394249]","8-9 : [204.19502,57.631752]","16-7 : [188.71683,61.865086]","8-10 : [195.99283,51.28175]","16-10 : [184.61578,49.694252]","14-15 : [130.37608,41.227589]","11-12 : [161.59697,59.483837]","12-13 : [162.12619,42.285912]","13-14 : [151.03227,33.311237]","12-4 : [121.11575,115.3109]"]
for i in range(len(arr)):
    word1 = arr[i].split(" : ")
    word = word1[0].split("-")
    int1 = int(word[0])
    int2 = int(word[1])
    final_str = "len_text_pos[" + str(int1 - 1) + "][" + str(int2 - 1) + "] = " + word1[1] if int1 < int2 else "len_text_pos[" + str(int2 - 1) + "][" + str(int1 - 1) + "] = " + word1[1]
    print(final_str)
