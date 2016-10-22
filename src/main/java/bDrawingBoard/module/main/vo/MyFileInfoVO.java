package bDrawingBoard.module.main.vo;

/**
 * 내 파일 정보 VO
 */
public class MyFileInfoVO {
    private int id;
    private String member_id;
    private String file_type;
    private int file_depth;
    private int file_parent;
    private int file_id;
    private String file_nicname;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }

    public String getFile_type() {
        return file_type;
    }

    public void setFile_type(String file_type) {
        this.file_type = file_type;
    }

    public int getFile_depth() {
        return file_depth;
    }

    public void setFile_depth(int file_depth) {
        this.file_depth = file_depth;
    }

    public int getFile_parent() {
        return file_parent;
    }

    public void setFile_parent(int file_parent) {
        this.file_parent = file_parent;
    }

    public int getFile_id() {
        return file_id;
    }

    public void setFile_id(int file_id) {
        this.file_id = file_id;
    }

    public String getFile_nicname() {
        return file_nicname;
    }

    public void setFile_nicname(String file_nicname) {
        this.file_nicname = file_nicname;
    }
}
