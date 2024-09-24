def gneed(prelimg, targetg):
    """
    calculate the required midterm and final grades to achieve the target overall grade.
    
    parameters:
    - prelimgrade: Grade received in prelims (0 to 100)
    - targetgrade: Desired overall grade (0 to 100)
    
    returns:
    - a tuple with required midterm and final grades.
    """
    prelimweight = 0.20
    midtermweight = 0.30
    finalweight = 0.50
    # rarget formula: targetgrade = (prelimweight * prelimgrade) + (midtermweight * midtermgrade) + (finalweight * finalgrade)
    # rearranged formula: (targetgrade - prelimweight * prelimgrade) = (midtermweight * midtermgrade) + (finaweight * finalgrade)
    remaininggrade = targetg - (prelimweight * prelimg)
    
    if midtermweight + finalweight == 0:
        return (None, None)
    
    reqfinalgrade = (remaininggrade - (midtermweight * 100)) / finalweight

    if reqfinalgrade > 100:
      
        reqmidtermgrade = (remaininggrade - (finalweight * 100)) / midtermweight
        
        if reqmidtermgrade < 0 or reqmidtermgrade > 100:
            return (None, None)  # impossible to achieve target grade
        
        return (reqmidtermgrade, 100)

    if reqfinalgrade < 0:
        return (None, None)  # impossible to achieve target grade
    
    return (100, reqfinalgrade)

prelimg = float(input("Enter your prelim grade: "))
targetg = float(input("Enter your target overall grade: "))

midtermg, finalg = gneed(prelimg, targetg)

if midtermg is None or finalg is None:
    print("It is not possible to achieve the target grade with the given prelim grade.")
else:
    print(f"You need approximately:\nMidterm Grade: {midtermg:.2f}\nFinal Grade: {finalg:.2f}")