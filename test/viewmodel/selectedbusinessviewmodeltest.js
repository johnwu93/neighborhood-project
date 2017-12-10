import SelectedBusinessViewModel from '../../src/scripts/viewmodel/selectedbusinessviewmodel';

const MARU_COFFEE_ID = 0;
const MARU_COFFEE = {id: MARU_COFFEE_ID};
const STARBUCKS_ID = 1;
const STARBUCKS = {id: STARBUCKS_ID};

describe('SelectedBusinessViewModel', () => {
  beforeEach(function setup() {
    this.businessMarkers = [
      MARU_COFFEE,
      STARBUCKS,
    ];
    this.selectedBusinessViewModel = new SelectedBusinessViewModel(this.businessMarkers);
  });

  it('should have initial state of id be null', function testInitialState() {
    expect(this.selectedBusinessViewModel.observableId()).toBeNull();
  });

  it('should have businessMarker be null if id is null', function testNull() {
    const businessMarker = this.selectedBusinessViewModel.observableBusinessMarker();
    expect(businessMarker).toBeNull();
  });

  it('should change id if businessMarker is mutated to a value that is not null', function testMatchingId() {
    this.selectedBusinessViewModel.changeId(MARU_COFFEE);
    const id = this.selectedBusinessViewModel.observableId();
    expect(id).toBe(MARU_COFFEE_ID);
  });

  it('should have id match with BusinessMarker id', function testMatchingBusinessMarker() {
    this.selectedBusinessViewModel.changeId(MARU_COFFEE);
    const businessMarker = this.selectedBusinessViewModel.observableBusinessMarker();
    expect(businessMarker.id).toBe(this.selectedBusinessViewModel.observableId());
  });

  it('should change id if businessMarker is mutated to a value that is null', function testMatchingIdNull() {
    this.selectedBusinessViewModel.changeId(MARU_COFFEE);
    this.selectedBusinessViewModel.changeId(null);
    const id = this.selectedBusinessViewModel.observableId();
    expect(id).toBeNull();
  });

  describe('on change businessMarker', () => {
    it('should change id when businessMarker is updated', function testOnChange() {
      this.selectedBusinessViewModel.setup();
      this.selectedBusinessViewModel.changeId(MARU_COFFEE);
      const id = this.selectedBusinessViewModel.observableId();
      expect(id).toBe(MARU_COFFEE_ID);
    });
  });
});
