import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class RealCalendarPart extends React.Component {
  months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  _onPress = (item) => {
    this.setState(() => {
      if (!item.match && item != -1) {
        this.state.activeDate.setDate(item);
        return this.state;
      }
    });
  };

  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };

  weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  state = {
    activeDate: new Date(),
  };

  generateMatrix() {
    var matrix = [];
    // Create header
    matrix[0] = this.weekDays;

    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();

    var maxDays = this.nDays[month];
    if (month == 1) {
      // 2월이 윤년인 경우
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }

  render() {
    var matrix = this.generateMatrix();

    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        return (
          <View
            style={{
              flex: 1,
              height: 50,
              borderWidth: rowIndex > 5 && item == -1 ? 0 : 0.5, // 테두리
              borderColor: '#E6E6E6', // 테두리 색상
            }}
          >
            <Text
              style={{
                fontSize: 16,
                flex: 1,
                textAlign: 'center',
                paddingTop: rowIndex == 0 ? 15 : 0,
                // Highlight header
                backgroundColor: rowIndex == 0 ? '#F4F4F4' : '#fff',
                // 일요일은 빨간색, 토요일은 파란색으로
                color: colIndex == 6 ? '#00a' : colIndex == 0 ? '#a00' : '#000',
                // 선택한 날짜 볼드처리
                fontWeight:
                  item == this.state.activeDate.getDate() ? 'bold' : '',
              }}
              onPress={() => this._onPress(item)}
            >
              {item != -1 ? item : ''}
            </Text>
          </View>
        );
      });

      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 25,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {rowItems}
        </View>
      );
    });

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            borderRadius: 10,
            height: hp('8%'),
            flexDirection: 'row',
            backgroundColor: '#E6E6E6',
          }}
        >
          <TouchableOpacity onPress={() => this.changeMonth(-1)}>
            <Text
              style={{
                marginTop: hp('1.5%'),
                fontSize: 30,
                textAlign: 'left',
                marginLeft: 20,
              }}
            >
              {'<'}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: hp('1.5%'),
              fontWeight: '600',
              fontSize: 30,
              textAlign: 'center',
              marginLeft: 10,
            }}
          >
            {this.months[this.state.activeDate.getMonth()]} &nbsp;
          </Text>
          <TouchableOpacity onPress={() => this.changeMonth(+1)}>
            <Text
              style={{
                marginTop: hp('1.5%'),
                fontSize: 30,
                textAlign: 'left',
              }}
            >
              {'>'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            flexDirection: 'row',
            // marginHorizontal: wp('-14.5%'), // 최후의 수단;;
            borderRadius: 10,
          }}
        >
          <View style={{ flex: 1 }} />
          <View style={{ flex: 10 }}>{rows}</View>
          <View style={{ flex: 1 }} />
        </View>
      </View>
    );
  }
}

export default RealCalendarPart;
