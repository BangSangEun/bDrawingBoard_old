/**
 * Created by user on 2016-10-12.
 */

/**
 * Member 객체
 * @constructor
 */
define([], function() {
    var Member = function() {

        this.init = function(memberId, memberPw, memberName, memberEmail) {
            this.memberId = memberId;
            this.memberPw = memberPw;
            this.memberName = memberName;
            this.memberEmail = memberEmail;
        }

        this.getMemberId = function() {
            return this.memberId;
        };

        this.setMemberId = function(memberId) {
            this.memberId = memberId;
        };

        this.getMemberPw = function() {
            return this.memberPw;
        };

        this.setMemberPw = function(memberPw) {
            this.memberPw = memberPw;
        };

        this.getMemberName = function() {
            return this.memberName;
        };

        this.setMemberName = function(memberName) {
            this.memberName = memberName;
        };

        this.getMemberEmail = function() {
            return this.memberEmail;
        };

        this.setMemberEmail = function(memberEmail) {
            this.memberEmail = memberEmail;
        };
    };

    return Member;
});


