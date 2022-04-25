const getLongestPalindromicSubstring = (str) => {
  if (str.length > 1000) {
    throw new Error("Maximum length of s is 1000");
  }

  let longestPalindromic = "";

  const uniqueChars = Array.from(new Set(str).values());
  for (uniqueChar of uniqueChars) {
    const unqiueCharIndexs = _findAllIndexOfChar(str, uniqueChar);

    const findedLongestPalindrom = _findLongestPalindromicFromCharIndexs(
      str,
      unqiueCharIndexs,
      longestPalindromic.length
    );

    if (
      findedLongestPalindrom &&
      findedLongestPalindrom.length > longestPalindromic.length
    ) {
      longestPalindromic = findedLongestPalindrom;
    }
  }

  return longestPalindromic;
};

const _findLongestPalindromicFromCharIndexs = (str, charIndexs, minLength) => {
  const lastIndex = charIndexs.length - 1;
  let palindromic = "";

  if (charIndexs.length === 1) {
    return str[0];
  }

  loop1: for (let charIdex of charIndexs) {
    if (charIndexs[lastIndex] - charIdex < minLength) {
      break;
    }

    for (let i = lastIndex; i > 0; i--) {
      const substring = str.substring(charIdex, charIndexs[i] + 1);
      if (substring.length < minLength) {
        continue loop1;
      }

      if (_isPalindrome(substring) && substring.length > minLength) {
        palindromic = substring;
        minLength = palindromic.length;
      }
    }
  }

  return palindromic;
};

const _findAllIndexOfChar = (string, char) => {
  const indexes = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      indexes.push(i);
    }
  }
  return indexes;
};

const _isPalindrome = (string) => {
  return string === string.split("").reverse().join("");
};

module.exports = {
  getLongestPalindromicSubstring,
};
