describe("First test", ()=>{
  it("Should give equal", ()=>{
    expect(1).toEqual(1);
  });

  it("Should not give equal", ()=>{
    expect(1).not.toEqual(2);
  });

})
