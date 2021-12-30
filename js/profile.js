const Profile = {
    show: function() {
        info = portfolio.profile;
        html = `
        <item class ="profileHeader">Name</item>
        <item class ="profileValue">${info.name}</item>
        <item class ="profileHeader">E-mail</item>
        <item class ="profileValue">${info.email}</item>
        <item class ="profileHeader">Mobile</item>
        <item class ="profileValue">${info.mobile}</item> 
        <item class ="profileHeader">Verification Status</item> 
        <item class ="profileValue">${info.verify}</item>
        <item class ="profileHeader">Withdrawal method</item>
        <item class ="profileValue">${info.method}</item>
        <item class ="profileHeader">Current withdrawal limit</item>
        <item class ="profileValue">${info.limit}</item>
        <item class ="profileHeader">Current asset net worth</item>
        <item class ="profileValue assetvalue"></item>
        <item class ="profileHeader">Trading and Withdrawl Fee </item>
        <item class ="profileValue">${info.fees}</item>
        `;
        App.show(html)
        page = "pr"
    }
}