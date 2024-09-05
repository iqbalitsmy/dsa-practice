// Valid Palindrome
// https://youtu.be/UXVHeXNO9AA?si=3mDZjC_mI69OMA_O
function isPalindrome(s) {
    // clean string
    const str = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    let left = 0, right = str.length - 1;

    while (left <= right) {
        if (str.charAt(left) !== str.charAt(right))
            return false;
        left++;
        right--;
    }

    return true;
}

// console.log(isPalindrome("A man, a plan, a canal: Panama"))

// Valid Anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    let countT = {}
    let countS = {}
    // cout the frequency.
    for (let i = 0; i < s.length; i++) {
        countT[s[i]] = (countT[s[i]] || 0) + 1;
        countS[t[i]] = (countS[t[i]] || 0) + 1;
    }
    // check every font have same frequency
    for (const key in countT) {
        if (countT[key] !== countS[key]) {
            return false
        }
    }
    return true;
}

// console.log(isAnagram("anagram", "nagaram"));

// Valid parentheses
// https://youtu.be/aKTGpBeOeZg?si=jMuytMCgtJRpSZij
function isValid(s) {
    if (s.length === 0 || ((s.length % 2) !== 0)) return false;

    let p = [];
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === "(" || s.charAt(i) === "{" || s.charAt(i) === "[") {     //check is opening parentheses 
            p.push(s.charAt(i));
        } else {
            if (p.length === 0) return false;

            if (!isMatching(p.pop(), s.charAt(i))) {        //check opening parentheses match close parentheses
                return false;
            }
        }
    }
    // stack is not empty means false
    return p.length === 0;
}

function isMatching(a, b) {
    return ((a === '(' && b === ')') ||
        (a === '{' && b === '}') ||
        (a === '[' && b === ']')
    )
}

// console.log(isValid("()"))

// Remove Consecutive Characters
// https://youtu.be/utn2wJ7VAns?si=XCb4t1W5ud_NPf0G
function removeConsecutiveCharacter(s) {
    let res = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i + 1]) continue     //if string match than continue else last unmatch text concat with string
        else res += s[i];
    }
    return res
}

// console.log(removeConsecutiveCharacter("aabaa"))

// Longest Common Prefix
function longestCommonPrefix(strs) {
    let str = strs[0];
    for (let i = 1; i < strs.length; i++) {
        for (let j = 0; j < str.length; j++) {
            // console.log(strs[i].charAt(j))
            if (str[j] !== strs[i].charAt(j)) {
                str = str.slice(0, j);
                break;
            }
        }
    }
    return str
}
// console.log(longestCommonPrefix(["flower","flow","flight"]))

// Convert a Sentence into its Equivalent Mobile Numeric Keypad Sequence
function printSequence(s) {
    let str = ["2", "22", "222",
        "3", "33", "333",
        "4", "44", "444",
        "5", "55", "555",
        "6", "66", "666",
        "7", "77", "777", "7777",
        "8", "88", "888",
        "9", "99", "999", "9999"]
    let res = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") res += "0"
        else {
            res += str[s.charCodeAt(i) - "A".charCodeAt(0)]
        }
    }
    return res;
}

// console.log(printSequence("HELLO WORLD"))

// Print all the duplicate characters in a string
function printDups(str) {
    let count = {}
    for (let i = 0; i < str.length; i++) {
        count[str[i]] = (count[str[i]] || 0) + 1
    }
    for (const key in count) {
        if (count[key] > 1) {
            console.log(`${key}, count ${count[key]}`)
        }
    }
}

// console.log(printDups("test string"))

// Longest Substring without Repeating Characters ->Not length
function longestSubstring(s) {
    let maxStr = "";
    let temp = "";

    for (let i = 0; i < s.length; i++) {
        if (!temp.includes(s.charAt(i))) {
            temp += s.charAt(i);
            if (temp.length > maxStr.length) maxStr = temp;
        } else {
            temp = "";
        }
    }
    return maxStr;
}

// console.log(longestSubstring("pwwkew"));

// Longest Substring without Repeating Characters
// https://youtu.be/dvXyTOYVxB8?si=XXYRkE9wnIV1NgLp
// https://www.youtube.com/watch?v=GehAJbfaB1s -> code

function lengthOfLongestSubstring(s) {      //we just need length of string
    let start = 0;
    let end = 0;
    let mxStr = 0;
    let subStr = new Set();

    while (end < s.length) {
        if (!subStr.has(s[end])) {
            subStr.add(s[end]);     //add after not match
            console.log(subStr.values())
            mxStr = Math.max(mxStr, subStr.size);
            end++;
        } else {
            subStr.delete(s[start]);    //subStr value remove after match
            console.log(subStr.values())
            start++;
        }
    }
    return mxStr;
}

// console.log(lengthOfLongestSubstring("abcabcbb"));

// Longest Repeating Character Replacement
// https://youtu.be/tkNWKvxI3mU?si=t10DrGcpvfBaEwpj
function characterReplacement(s, k) {
    let longest = 0, l = 0;
    let counts = new Array(26).fill(0);     //assign frequency count of letter array with 0

    for (let r = 0; r < s.length; r++) {
        counts[s.charCodeAt(r) - "A".charCodeAt(0)] += 1    //count the letter frequency

        while (((r - l + 1) - Math.max(...counts.map((i) => i))) > k) {     //check wether is gater than k
            counts[s.charCodeAt(l) - "A".charCodeAt(0)] -= 1    //reduce the frequency of letter
            l += 1;                                             //reduce from the left side of array
        }
        longest = Math.max(longest, (r - l + 1))            //longest substring length
    }
    return longest;
}
// console.log(characterReplacement("ABAB", 2))

// Group Anagrams
// https://youtu.be/vzdNOK2oB2E?si=bQM1LEqKguNcKwJV     --in python
function groupAnagrams(strs) {      //map has same key but array of value
    //anagram word has same count. so, that will be key of map and value will be array anagram group
    //in has map key can't be repeated.

    let res = {};

    for (let i = 0; i < strs.length; i++) {
        let count = new Array(26).fill(0)
        for (let j = 0; j < strs[i].length; j++)
            count[strs[i].charCodeAt(j) - "a".charCodeAt(0)]++;

        if (!res[count.toString()]) res[count.toString()] = []; //key and value pair if not exist ensure that value type will be array.

        res[count.toString()].push(strs[i]);
    }

    return Object.values(res).reverse();
}

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

// Longest Palindromic Substring
// https://youtu.be/XYQecbcd6_c?si=-50N5Shrku49Ozw7
function longestPalindrome(s) {
    let res = ""
    let reslen = 0;

    for (let i = 0; i < s.length; i++) {
        // for odd length
        let l = i, r = i;
        while ((l >= 0 && r < s.length) && s[l] === s[r]) {
            if (reslen < (r - l + 1)) {
                res = s.slice(l, r + 1);
                reslen = r - l + 1;
            }
            l -= 1;
            r += 1;
        }
        // for even length
        l = i, r = i + 1;
        while ((l >= 0 && r < s.length) && s[l] === s[r]) {
            if (reslen < (r - l + 1)) {
                res = s.slice(l, r + 1);
                reslen = r - l + 1;
            }
            l -= 1;
            r += 1;
        }
    }

    return res;
}

// console.log(longestPalindrome("babad"))

// Palindromic Substrings
function countSubstrings(s) {
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        // for odd length
        let l = i, r = i;
        while ((l >= 0 && r < s.length) && s[l] === s[r]) {
            count += 1;
            l -= 1;
            r += 1;
        }
        // for even length
        l = i, r = i + 1;
        while ((l >= 0 && r < s.length) && s[l] === s[r]) {
            count += 1;
            l -= 1;
            r += 1;
        }
    }

    return count;
}

// console.log(countSubstrings("aab"))
// Count Palindromic Subsequences
function countPS(str) {
    
}

console.log(countPS("aaa"))