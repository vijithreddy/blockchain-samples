const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const isValidAddressPolkadotAddress = address => {
    try {
      encodeAddress(
        isHex(address)
          ? hexToU8a(address)
          : decodeAddress(address)
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  function testValidAddress(address)
  {
      try{
        encodeAddress(
            isHex(address)
              ? hexToU8a(address)
              : decodeAddress(address)
          );
          return true
      } catch (error){
          return false;
      }
  }


// console.log(isValidAddressPolkadotAddress("5GrknVvGGrGH3EFuURXeMrWHvbpj3VfER1oX5jFtuGbfzCE"));
console.log(testValidAddress("15yCZaahgE3on5YX9vMQpo4PgPJ8yPgcfYWQ3h8EY1r7e5vG"));