class Solution {
  public:
    /*You are required to complete this method */
    int findMaxDiff(vector<int> &arr) {
        // Your code here
        int n = arr.size();
        vector<int> left(n),right(n);
        stack<int> st;
        for(int i=0;i<n;i++){
            while(!st.empty() and st.top()>=arr[i])st.pop();
            if(!st.empty())left[i]=st.top();
            else left[i]=0;
            st.push(arr[i]);
        }
        while(!st.empty())st.pop();
        for(int i=n-1;i>=0;i--){
            while(!st.empty() and st.top()>=arr[i])st.pop();
            if(!st.empty())right[i]=st.top();
            else right[i]=0;
            st.push(arr[i]);
        }
        int ans = INT_MIN;
        for(int i=0;i<n;i++){
            ans=max(ans,abs(left[i]-right[i]));
        }
        return ans;
    }
};