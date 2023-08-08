// reset.js
import { auth, firestore } from './firebase';

const handleReset = async (navigation) => {
  const resetCollectionRef = firestore.collection('reset').doc('reset');

  try {
    const resetSnapshot = await resetCollectionRef.get();

    if (resetSnapshot.exists) {
      const resetData = resetSnapshot.data();
      const isReset = resetData.reset;

      if (isReset) {
        // 1. Reset the 'answered' field for all documents in the 'users' collection
        const usersCollectionRef = firestore.collection('users');
        const usersSnapshot = await usersCollectionRef.get();

        usersSnapshot.forEach(async (userDoc) => {
          try {
            const userRef = firestore.collection('users').doc(userDoc.id);
            await userRef.update({ answered: false });
          } catch (error) {
            console.error('Error resetting answered field for user:', error);
          }
        });

        // 2. Compare the 'amount' fields in the 'FundsOption1' and 'FundsOption2' documents
        const fundsOption1Ref = firestore.collection('funds').doc('FundsOption1');
        const fundsOption2Ref = firestore.collection('funds').doc('FundsOption2');

        const fundsOption1Snapshot = await fundsOption1Ref.get();
        const fundsOption2Snapshot = await fundsOption2Ref.get();

        const fundsOption1Data = fundsOption1Snapshot.data();
        const fundsOption2Data = fundsOption2Snapshot.data();

        const amountOption1 = fundsOption1Data.amount;
        const amountOption2 = fundsOption2Data.amount;

        let largerAmount;
        let smallerAmount;
        let usersInLargerAmount;

        if (amountOption1 > amountOption2) {
          largerAmount = amountOption1;
          smallerAmount = amountOption2;
          usersInLargerAmount = Object.keys(fundsOption1Data).filter((key) => fundsOption1Data[key] === true);
        } else {
          largerAmount = amountOption2;
          smallerAmount = amountOption1;
          usersInLargerAmount = Object.keys(fundsOption2Data).filter((key) => fundsOption2Data[key] === true);
        }

        // 3. Divide the smaller amount by the number of users in the document with the larger 'amount' field
        const dividedAmount = (smallerAmount + largerAmount) / usersInLargerAmount.length;
        const roundedDividedAmount = Number(dividedAmount.toFixed(2));        
        // 4. Update the 'funds' field for each user in the document with the larger 'amount' field
        for (const userId of usersInLargerAmount) {
          try {
            const userRef = firestore.collection('users').doc(userId);
            const userSnapshot = await userRef.get();
            const userData = userSnapshot.data();

            if (userData) {
              const currentFunds = userData.funds;
              await userRef.update({ funds: String(Number(currentFunds) + roundedDividedAmount) });
            }
          } catch (error) {
            console.error('Error updating user funds:', error);
          }
        }

        await fundsOption1Ref.set({ amount: 0 });
        await fundsOption2Ref.set({ amount: 0 });
        console.log('Reset performed successfully!');

        // 5. Set the 'reset' field back to false in the 'reset' document

        // 6. Log out the user and navigate to the 'LoginRegister' screen
        auth
          .signOut()
          .then(() => {
            navigation.replace('LoginRegister');
          })
          .catch((error) => alert(error.message));
      } else {
        console.log('Reset field is not set to true.');
      }
    } else {
      console.log('Reset document not found.');
    }
  } catch (error) {
    console.error('Error fetching reset data:', error);
  }
};

export default handleReset;
