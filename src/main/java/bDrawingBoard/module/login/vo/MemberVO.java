package bDrawingBoard.module.login.vo;

/**
 * 회원 정보 VO
 */
public class MemberVO {
    private String member_id;
    private String member_pw;
    private String member_name;
    private String member_email;
    private String regi_date;

    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }

    public String getMember_pw() {
        return member_pw;
    }

    public void setMember_pw(String member_pw) {
        this.member_pw = member_pw;
    }

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
    }

    public String getMember_email() {
        return member_email;
    }

    public void setMember_email(String member_email) {
        this.member_email = member_email;
    }

    public String getRegi_date() {
        return regi_date;
    }

    public void setRegi_date(String regi_date) {
        this.regi_date = regi_date;
    }
}
