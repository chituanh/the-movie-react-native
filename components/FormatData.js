export default ListToString = (listString) => {
  ans = "";
  for (var i in listString) {
    ans += listString[i] + ", ";
  }
  return ans;
};
